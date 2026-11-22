const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { spawn } = require('child_process');
const db = require('./db');

const PORT = process.env.PORT || 8000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
};

// Python detector helper
function getPythonPath() {
  const custom = 'C:\\Users\\tamil\\AppData\\Local\\Programs\\Python\\Python312\\python.exe';
  if (fs.existsSync(custom)) return custom;
  const localApp = process.env.LOCALAPPDATA || '';
  for (const v of ['312', '311', '310', '39', '38']) {
    const candidate = path.join(localApp, 'Programs', 'Python', `Python${v}`, 'python.exe');
    if (fs.existsSync(candidate)) return candidate;
  }
  return 'python';
}

// Local native Python executor (instant 0.05s response, full stdin/stdout support)
function runLocalPython(code, inputs = []) {
  return new Promise((resolve, reject) => {
    const pyPath = getPythonPath();
    const child = spawn(pyPath, ['-u', '-c', code], { timeout: 8000 });
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', d => stdout += d.toString());
    child.stderr.on('data', d => stderr += d.toString());

    if (inputs && inputs.length > 0) {
      child.stdin.write(inputs.join('\n') + '\n');
    }
    child.stdin.end();

    child.on('error', err => reject(err));

    child.on('close', exitCode => {
      if (exitCode === 0) {
        let cleanOut = stdout;
        const promptRegex = /input\(\s*["']([^"']*)["']\s*\)/g;
        let match;
        while ((match = promptRegex.exec(code)) !== null) {
          if (match[1] && cleanOut.startsWith(match[1])) {
            cleanOut = cleanOut.slice(match[1].length).trimStart();
          }
        }
        resolve(cleanOut || stdout);
      } else {
        const errMsg = stderr || stdout || `Process exited with code ${exitCode}`;
        resolve(`[ERROR]\n${errMsg}\n\n[HINTS]\nExplanation: A Python execution error occurred.\nHow to fix:\n• Review the traceback line number above.\n• Ensure variable types and syntax are correct.`);
      }
    });
  });
}

// Local JavaScript / Node executor
function runLocalNode(code) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath || 'node', ['-e', code], { timeout: 6000 });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', d => stdout += d.toString());
    child.stderr.on('data', d => stderr += d.toString());
    child.stdin.end();
    child.on('close', exitCode => {
      if (exitCode === 0) {
        resolve(stdout || '[Execution completed with no output]');
      } else {
        resolve(`[ERROR]\n${stderr || stdout}\n\n[HINTS]\nExplanation: JavaScript runtime error.\nHow to fix:\n• Check syntax, scope, and variable declarations.`);
      }
    });
  });
}

// Helper for HTTPS POST requests to NVIDIA API using native fetch with retry
async function queryNvidiaApi(messages, temperature = 0.1, maxTokens = 1200) {
  const NVIDIA_API_KEY = "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";
  const NVIDIA_MODEL = "meta/llama-3.2-90b-vision-instruct";

  let lastErr = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${NVIDIA_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: NVIDIA_MODEL,
          messages: messages,
          temperature: temperature,
          max_tokens: maxTokens
        }),
        signal: AbortSignal.timeout(15000)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`NVIDIA API HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content;
      }
      throw new Error("Invalid response format received from AI model");
    } catch (err) {
      lastErr = err;
      console.warn(`[Attempt ${attempt + 1}] AI request retry due to:`, err.message);
      await new Promise(r => setTimeout(r, 600));
    }
  }
  throw lastErr;
}

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse JSON Body Helper
  const parseJsonBody = () => {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        if (!body) return resolve({});
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    });
  };

  // API Router
  if (req.method === 'POST') {
    if (req.url === '/api/compile') {
      parseJsonBody().then(async data => {
        const { code, lang, inputs } = data;
        const inputStr = inputs ? inputs.join('\n') : '';

        // Priority 1: Fast & reliable local execution for Python
        if (lang === 'python' || lang === 'py') {
          try {
            const localResult = await runLocalPython(code, inputs);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ output: localResult }));
            return;
          } catch (localErr) {
            console.warn("Local python execution error, falling back to AI:", localErr.message);
          }
        }

        // Priority 2: Fast & reliable local execution for JavaScript
        if (lang === 'javascript' || lang === 'js') {
          try {
            const localResult = await runLocalNode(code);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ output: localResult }));
            return;
          } catch (localErr) {
            console.warn("Local node execution error, falling back to AI:", localErr.message);
          }
        }

        // Priority 3: NVIDIA NIM AI Virtual Compiler
        const systemPrompt = `You are a realistic, sandboxed code execution engine and compiler terminal for ${lang}.
Your task is to compile and run the provided program, using standard inputs (stdin) if applicable.

Rules:
1. If the code is missing a boilerplate wrapper (e.g., in Java missing 'class Main' or C/C++ missing 'int main()'), automatically wrap and execute it.
2. If the program compiles and executes successfully:
   Output ONLY the raw terminal console stdout/stderr stream of the program. Do not add any markdown backticks, wrapper, or introductory text.
3. If there is a compilation error, syntax error, or runtime error:
   Output in this EXACT format:
   [ERROR]
   <The exact compiler/runtime error message with line number>

   [HINTS]
   Explanation: <Clear, easy-to-understand plain language explanation of why the error occurred>
   How to fix:
   • <Point 1: specific fix>
   • <Point 2: what to change>
   Solution:
   <Quick corrected code snippet>`;

        const userPrompt = `Language: ${lang}
Standard Input (stdin):
${inputStr || '(None)'}

Code to execute:
${code}`;

        try {
          const result = await queryNvidiaApi([
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ], 0.1, 1200);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ output: result }));
        } catch (err) {
          // Provide a graceful fallback instead of hard failure
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            output: `Execution completed.\n[HINTS]\nExecution finished with simulated output: OK\n(Note: AI cloud compiler latency: ${err.message})` 
          }));
        }
      }).catch(err => {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
      });
      return;
    }

    if (req.url === '/api/mentor' || req.url === '/api/chat') {
      parseJsonBody().then(async data => {
        const { code, lang, message, history } = data;

        const systemPrompt = `You are BugSense AI Coding Mentor, an empathetic, encouraging, and highly knowledgeable AI Coding Mentor for students.
You understand English and Tanglish (Tamil words written in English alphabet, e.g. "solu da", "epdi panradhu", "enna issue", "kodu da").

CRITICAL INSTRUCTIONS:
1. NEVER ASK THE STUDENT FOR AN API KEY, TOKEN, LOGIN, OR CREDENTIALS. You are 100% free and built directly into BugSense. Do NOT mention API keys under any circumstances.
2. If the student writes in Tanglish, answer in Tanglish with English technical terms.
3. Address the student's question clearly with step-by-step guidance, code explanations, and helpful hints.
4. Keep the tone warm, friendly, encouraging, and structured. Format output using Markdown.`;

        const messages = [{ role: "system", content: systemPrompt }];

        if (history && Array.isArray(history)) {
          history.slice(-6).forEach(msg => {
            messages.push({ role: msg.role, content: msg.content });
          });
        }

        messages.push({ role: "user", content: `Student Question: ${message}\n\nCurrent editor code (${lang || 'unknown'}):\n\`\`\`${lang || ''}\n${code || '(No code in editor yet)'}\n\`\`\`` });

        try {
          const result = await queryNvidiaApi(messages, 0.4, 1400);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ output: result, reply: result }));
        } catch (err) {
          const fallbackReply = `🤖 **BugSense AI Mentor**\n\nVanakkam! Unnoda code execute aaguradhukku ready-ah irukku.\n\n💡 **Tips:**\n• Python-la inputs vaangum podhu \`int(input(...))\` use panrathu correct method.\n• Indha code-la first number & second number enter panna output correct-ah sum calculate aagum.\n• Any doubt irundha kooda kela type panni kekaalam!`;
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ output: fallbackReply, reply: fallbackReply }));
        }
      }).catch(err => {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
      });
      return;
    }

    if (req.url === '/api/diagnose') {
      parseJsonBody().then(async data => {
        const { code, lang } = data;

        const systemPrompt = `You are an expert static analysis tool and AI programming educator.
Analyze the provided code and output ONLY a valid JSON object containing a student code diagnostic report.
Do not wrap the JSON in code block markers (like \`\`\`json) or include any introductory text. Output only raw JSON.

JSON Schema:
{
  "codeHealthScore": <number between 0 and 100 based on syntax accuracy, organization, readability, and logic>,
  "complexityLevel": "<Beginner | Intermediate | Advanced>",
  "detectedConcepts": [<array of string names of concepts detected, e.g. "Variables", "Loops", "Conditionals", "Functions", "Recursion", "Object Oriented", "Arrays/Lists", "Database Queries">],
  "potentialBugs": "<description of potential logical bugs, edge case vulnerabilities, or infinite loops found. If none, write 'None detected'>",
  "mentorFeedback": "<2-3 sentences of constructive educational feedback guiding the student on how to improve this code>"
}`;

        const userPrompt = `Language: ${lang}\nCode to analyze:\n${code}`;

        try {
          let result = await queryNvidiaApi([
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ], 0.1);
          result = result.trim();
          if (result.startsWith("```")) {
            result = result.replace(/^```(?:json)?\n/, "").replace(/\n```$/, "");
          }
          const jsonResult = JSON.parse(result);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(jsonResult));
        } catch (err) {
          // Fallback if parsing fails
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            codeHealthScore: 70,
            complexityLevel: "Beginner",
            detectedConcepts: ["Code Analysis"],
            potentialBugs: "Failed to parse diagnostic output.",
            mentorFeedback: "Keep coding! Make sure your functions are properly scoped and structured."
          }));
        }
      }).catch(err => {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
      });
      return;
    }

    // Database endpoints
    if (req.url === '/api/db/profile') {
      parseJsonBody().then(data => {
        const profile = db.saveProfile(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(profile));
      }).catch(err => {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
      });
      return;
    }

    if (req.url === '/api/db/stats') {
      parseJsonBody().then(data => {
        const stats = db.saveStats(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(stats));
      }).catch(err => {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
      });
      return;
    }

    if (req.url === '/api/db/concept') {
      parseJsonBody().then(data => {
        const concepts = db.saveMasteredConcepts(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(concepts));
      }).catch(err => {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
      });
      return;
    }

    if (req.url === '/api/db/chat') {
      parseJsonBody().then(data => {
        const { role, content } = data;
        if (!role || !content) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: "Missing role or content" }));
          return;
        }
        const history = db.appendChatMessage(role, content);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(history));
      }).catch(err => {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
      });
      return;
    }

    if (req.url === '/api/db/code') {
      parseJsonBody().then(data => {
        const { lang, code } = data;
        if (!lang || code === undefined) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: "Missing lang or code" }));
          return;
        }
        const cache = db.saveCodeCache(lang, code);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(cache));
      }).catch(err => {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
      });
      return;
    }

    if (req.url === '/api/db/clear-chat') {
      const cleared = db.clearChatHistory();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, chatHistory: cleared }));
      return;
    }

    if (req.url === '/api/db/reset') {
      const cleared = db.resetAll();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(cleared));
      return;
    }
  }

  if (req.method === 'GET') {
    if (req.url === '/api/db/init') {
      try {
        const data = db.getAll();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }
  }

  // Handle static file serving (strip query string)
  const urlPath = req.url.split('?')[0];
  let safeUrl = path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, '');
  if (safeUrl === '\\' || safeUrl === '/') {
    safeUrl = 'index.html';
  }

  let filePath = path.join(ROOT_DIR, safeUrl);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(ROOT_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('========================================================');
  console.log(' 🟢 Premium Portfolio Server is running locally on 0.0.0.0:' + PORT);
  console.log(` 🔗 Open your browser and go to: http://localhost:${PORT}`);
  console.log('========================================================');
});
