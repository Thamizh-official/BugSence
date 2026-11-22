// --- Templates database for all 15 languages ---
const templates = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Developer Team Database</title>
  <style>
    body {
      margin: 0;
      padding: 30px;
      background: linear-gradient(135deg, #0f172a, #1e1b4b);
      font-family: 'Segoe UI', system-ui, sans-serif;
      color: #f1f5f9;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .table-container {
      width: 100%;
      max-width: 800px;
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 24px;
    }
    h2 {
      margin: 0 0 16px 0;
      font-size: 1.4rem;
      background: linear-gradient(to right, #a78bfa, #38bdf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th {
      padding: 10px 14px;
      color: #94a3b8;
      font-size: 0.85rem;
      text-transform: uppercase;
      border-bottom: 2px solid rgba(255, 255, 255, 0.05);
    }
    td {
      padding: 10px 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 0.95rem;
      color: #e2e8f0;
    }
    .badge {
      display: inline-block;
      padding: 3px 8px;
      font-size: 0.75rem;
      border-radius: 10px;
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
    }
    .badge.pro {
      background: rgba(167, 139, 250, 0.15);
      color: #a78bfa;
    }
  </style>
</head>
<body>
  <div class="table-container">
    <h2>Developer Team Database</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Language</th>
          <th>Experience</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Tamil</td>
          <td>Python</td>
          <td>5 Years</td>
          <td><span class="badge pro">Senior Dev</span></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Anand</td>
          <td>TypeScript</td>
          <td>4 Years</td>
          <td><span class="badge">Fullstack</span></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Sarah</td>
          <td>C++</td>
          <td>7 Years</td>
          <td><span class="badge pro">Systems Lead</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>`,

  python: `# Python 3 Execution Demo
print("=== Python 3 Output ===")

languages = ["Python", "JavaScript", "C++", "Java", "TypeScript", "SQL"]
print(f"Supported languages: {len(languages)}")

# Fibonacci sequence calculation
def fibonacci(n):
    a, b = 0, 1
    seq = []
    for _ in range(n):
        seq.append(a)
        a, b = b, a + b
    return seq

print("First 8 Fibonacci numbers:", fibonacci(8))
print("Status: Python executed without errors!")
`,

  typescript: `// TypeScript Interface and Class Demo
interface Developer {
    name: string;
    skills: string[];
    experience: number;
    greet(): string;
}

class PolyglotDeveloper implements Developer {
    constructor(
        public name: string,
        public skills: string[],
        public experience: number
    ) {}

    greet(): string {
        return \`Hello, I am \${this.name}. I code in \${this.skills.length} languages!\`;
    }
}

const dev: Developer = new PolyglotDeveloper(
    "Tamil",
    ["Python", "TypeScript", "C++", "Java", "SQL"],
    5
);

console.log("=== TypeScript Output ===");
console.log(dev.greet());
console.log("Skills:", dev.skills.join(", "));
`,

  javascript: `// JavaScript Data Processing Demo
console.log("=== JavaScript Output ===");

const numbers = [10, 25, 30, 45, 50, 65, 80];
const evenNumbers = numbers.filter(n => n % 2 === 0);
const sum = evenNumbers.reduce((acc, curr) => acc + curr, 0);

console.log("Original Numbers:", numbers);
console.log("Even Numbers:    ", evenNumbers);
console.log("Sum of Evens:    ", sum);
console.log("Status: Executed without error!");
`,

  sql: `-- SQLite Database Execution
CREATE TABLE IF NOT EXISTS DEVELOPERS (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    primary_language TEXT NOT NULL,
    experience INTEGER
);

INSERT INTO DEVELOPERS (name, primary_language, experience) VALUES 
('Tamil', 'Python', 5),
('Anand', 'TypeScript', 4),
('Sarah', 'C++', 7),
('Kumar', 'Java', 6);

SELECT * FROM DEVELOPERS WHERE experience >= 4;
`,

  r: `# R Statistical Analysis Demo
vector_data <- c(12, 15, 23, 40, 56, 78, 102, 140)

mean_val <- mean(vector_data)
median_val <- median(vector_data)
sd_val <- sd(vector_data)

cat("=== R Language Summary Statistics ===\\n")
cat("Dataset:         ", vector_data, "\\n")
cat("Arithmetic Mean: ", mean_val, "\\n")
cat("Median Value:    ", median_val, "\\n")
cat("Standard Dev:    ", round(sd_val, 2), "\\n")
`,

  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("=== Java Program Execution ===");
        String developer = "Tamil";
        int experience = 5;
        
        System.out.println("Developer: " + developer);
        System.out.println("Experience: " + experience + " Years");
        
        int total = 0;
        for (int i = 1; i <= 10; i++) {
            total += i;
        }
        System.out.println("Sum of numbers 1 to 10: " + total);
        System.out.println("Status: Java executed successfully!");
    }
}`,

  cpp: `#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::cout << "=== C++ Execution Output ===" << std::endl;
    std::vector<int> scores = {85, 92, 78, 96, 88};
    
    int sum = std::accumulate(scores.begin(), scores.end(), 0);
    double average = (double)sum / scores.size();
    
    std::cout << "Scores count: " << scores.size() << std::endl;
    std::cout << "Total Sum:    " << sum << std::endl;
    std::cout << "Average:      " << average << std::endl;
    std::cout << "Status: C++ executed successfully!" << std::endl;
    return 0;
}`,

  c: `#include <stdio.h>

int main() {
    printf("=== C Program Execution ===\\n");
    int numbers[] = {5, 12, 18, 24, 30};
    int length = sizeof(numbers) / sizeof(numbers[0]);
    int sum = 0;
    
    for (int i = 0; i < length; i++) {
        sum += numbers[i];
    }
    
    printf("Array items: 5, 12, 18, 24, 30\\n");
    printf("Total sum:   %d\\n", sum);
    printf("Average:     %.2f\\n", (float)sum / length);
    printf("Status: C program executed successfully!\\n");
    return 0;
}`,

  csharp: `using System;

public class Program {
    public static void Main() {
        Console.WriteLine("=== C# Execution Output ===");
        string developer = "Tamil";
        string[] skills = { "C#", ".NET Core", "SQL Server", "Azure" };
        
        Console.WriteLine("Developer: " + developer);
        Console.WriteLine("Certified Skills: " + string.Join(", ", skills));
        Console.WriteLine("Skill Count: " + skills.Length);
        Console.WriteLine("Status: C# executed successfully!");
    }
}`,

  matlab: `% MATLAB / Octave Matrix Processing
disp('=== MATLAB / Octave Matrix Processing ===');

A = [1, 2, 3; 4, 5, 6; 7, 8, 9];
B = [9, 8, 7; 6, 5, 4; 3, 2, 1];

disp('Matrix Addition (A + B):');
disp(A + B);

disp('Matrix Transpose (A''):');
disp(A');
disp('Status: MATLAB computation completed successfully!');
`,

  kotlin: `fun main() {
    println("=== Kotlin Execution Output ===")
    
    val languages = listOf("Kotlin", "Java", "Python", "TypeScript", "C++")
    println("Total languages: \${languages.size}")
    
    println("Filtered languages starting with 'K' or 'P':")
    languages
        .filter { it.startsWith("K") || it.startsWith("P") }
        .forEach { println(" - $it") }
        
    println("Status: Kotlin executed successfully!")
}`,

  swift: `import Foundation

print("=== Swift Execution Output ===")

struct Task {
    var title: String
    var isCompleted: Bool
}

let tasks = [
    Task(title: "Initialize IDE Workspace", isCompleted: true),
    Task(title: "Connect AI Sandbox Compiler", isCompleted: true),
    Task(title: "Compile Code without Errors", isCompleted: true)
]

for task in tasks {
    let icon = task.isCompleted ? "✅" : "⏳"
    print("\\(icon) \\(task.title)")
}
print("Status: Swift executed successfully!")`,

  php: `<?php
echo "=== PHP Execution Output ===\\n";

$languages = ["PHP", "JavaScript", "Python", "SQL"];
$total = count($languages);

echo "Total Tech Stack: " . $total . "\\n";
echo "Technologies: " . implode(" | ", $languages) . "\\n";

$timestamp = date("Y-m-d H:i:s");
echo "Execution Timestamp: " . $timestamp . "\\n";
echo "Status: PHP executed successfully!\\n";
?>`
};

// Monaco file extensions mappings
const fileExtensions = {
  html: 'index.html',
  python: 'main.py',
  typescript: 'index.ts',
  javascript: 'app.js',
  sql: 'queries.sql',
  r: 'analysis.r',
  java: 'Main.java',
  cpp: 'main.cpp',
  c: 'main.c',
  csharp: 'Program.cs',
  matlab: 'computation.m',
  kotlin: 'App.kt',
  swift: 'main.swift',
  php: 'index.php'
};

// State caches
let codeCache = { ...templates };
let currentLang = 'html';
let editor = null;

// --- Engine Instantiation Cache ---
let sqlEngineInstance = null;

// --- Initialize Monaco Editor ---
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs' } });
require(['vs/editor/editor.main'], function () {
  const container = document.getElementById('editor-container');
  const currentTheme = document.body.getAttribute('data-theme') === 'light' ? 'vs' : 'vs-dark';

  editor = monaco.editor.create(container, {
    value: codeCache[currentLang],
    language: 'html',
    theme: currentTheme,
    automaticLayout: true,
    fontSize: 14.5,
    fontFamily: "'Fira Code', 'Consolas', monospace",
    minimap: { enabled: false },
    lineNumbers: 'on',
    lineNumbersMinChars: 1,
    lineDecorationsWidth: 0,
    glyphMargin: false,
    folding: false,
    renderLineHighlight: 'line',
    renderIndentGuides: false,
    guides: {
      indentation: false,
      highlightActiveIndentation: false
    },
    overviewRulerLanes: 0,
    overviewRulerBorder: false,
    hideCursorInOverviewRuler: true,
    padding: { top: 12, bottom: 12 },
    roundedSelection: true,
    scrollBeyondLastLine: false,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: 'on'
  });

  // Load persistent DB data on startup once editor is ready
  initDatabaseState();
});

// --- Sidebar Language Switcher ---
const languageItems = document.querySelectorAll('.language-item');
const editorTitle = document.getElementById('editor-title');

languageItems.forEach(item => {
  item.addEventListener('click', () => {
    if (editor) {
      const codeVal = editor.getValue();
      codeCache[currentLang] = codeVal;
      saveCodeToDb(currentLang, codeVal);
    }

    languageItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    currentLang = item.getAttribute('data-lang');
    const monacoMode = item.getAttribute('data-mode');

    if (editor) {
      editor.setValue(codeCache[currentLang]);
      monaco.editor.setModelLanguage(editor.getModel(), monacoMode);
    }

    const extName = fileExtensions[currentLang];
    editorTitle.innerHTML = `<i class="${item.querySelector('i').className}"></i> ${extName}`;
  });
});

// --- Dark/Light Layout Toggle ---
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-icon-el');

const savedTheme = localStorage.getItem('theme') || 'dark';
document.body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);

  if (editor) {
    monaco.editor.setTheme(newTheme === 'light' ? 'vs' : 'vs-dark');
  }
});

function updateThemeIcon(theme) {
  if (theme === 'light') {
    themeIcon.className = 'fa-solid fa-sun';
  } else {
    themeIcon.className = 'fa-solid fa-moon';
  }
}

// --- Loading Panel Helpers ---
const runningOverlay = document.getElementById('running-overlay');
const loaderText = document.getElementById('loader-text');

function showLoader(text) {
  loaderText.textContent = text;
  runningOverlay.style.display = 'flex';
}

function hideLoader() {
  runningOverlay.style.display = 'none';
}

// --- Dynamic In-Terminal Prompt Reader ---
function readTerminalInput(promptText) {
  return new Promise((resolve) => {
    const log = document.getElementById('terminal-log');
    
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.gap = '8px';
    row.style.margin = '5px 0';
    row.style.color = '#a7f3d0';
    
    const label = document.createElement('span');
    label.style.fontFamily = 'var(--font-code)';
    label.textContent = promptText;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.style.background = 'rgba(255, 255, 255, 0.04)';
    input.style.border = 'none';
    input.style.borderBottom = '2px solid var(--accent-primary)';
    input.style.color = '#10b981'; // Rich green input text
    input.style.fontFamily = 'var(--font-code)';
    input.style.fontSize = '1.05rem';
    input.style.fontWeight = '600';
    input.style.padding = '4px 10px';
    input.style.borderRadius = '4px 4px 0 0';
    input.style.outline = 'none';
    input.style.flex = '1';
    
    row.appendChild(label);
    row.appendChild(input);
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
    
    input.focus();
    
    const keepFocus = () => input.focus();
    log.addEventListener('click', keepFocus);
    
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value;
        row.innerHTML = `<span>${promptText}</span><span style="color: #10b981; font-weight: 600; font-size: 1.05rem; margin-left: 5px;">${escapeHTML(val)}</span>`;
        log.removeEventListener('click', keepFocus);
        resolve(val);
      }
    });
  });
}

// --- Local SQLite Engine (For direct SQL queries) ---
async function runSqlLocal(code) {
  if (!sqlEngineInstance) {
    showLoader("Initializing SQL SQLite Engine...");
    try {
      sqlEngineInstance = await initSqlJs({
        locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
      });
    } catch (err) {
      hideLoader();
      return `<span style="color: var(--error);">Failed to initialize SQL SQLite Engine: ${escapeHTML(err.message)}<br>Make sure you are connected to the internet.</span>`;
    }
    hideLoader();
  }

  let consoleLogHtml = "";
  try {
    const db = new sqlEngineInstance.Database();
    const resultSets = db.exec(code);

    if (resultSets.length === 0) {
      return "Query executed successfully. No rows returned.";
    }

    resultSets.forEach(res => {
      let tableHtml = `<table class="terminal-table"><thead><tr>`;
      res.columns.forEach(col => {
        tableHtml += `<th>${escapeHTML(col)}</th>`;
      });
      tableHtml += `</tr></thead><tbody>`;

      res.values.forEach(row => {
        tableHtml += `<tr>`;
        row.forEach(val => {
          tableHtml += `<td>${escapeHTML(val !== null ? val.toString() : 'NULL')}</td>`;
        });
        tableHtml += `</tr>`;
      });
      tableHtml += `</tbody></table>`;
      consoleLogHtml += tableHtml;
    });
  } catch (err) {
    consoleLogHtml += `<span style="color: var(--error);">SQLite Error: ${escapeHTML(err.message)}</span><br>[HINTS]<br>SQL syntax error detected. Double check column names and table constraints.`;
  }
  return consoleLogHtml;
}

// --- Local JavaScript/TypeScript execution with intercepts ---
function runJavascriptLocal(code) {
  let output = "";
  try {
    const originalLog = console.log;
    console.log = (...args) => {
      output += args.join(' ') + '\n';
    };
    eval(code);
    console.log = originalLog;
  } catch (err) {
    output += `\nError: ${err.message}\n[HINTS]\nJavaScript runtime error occurred. Verify variable scopes and spelling.`;
  }
  return output;
}

function runTypescriptLocal(code) {
  let output = "";
  try {
    const transpiledJs = ts.transpile(code);
    const originalLog = console.log;
    
    console.log = (...args) => {
      output += args.join(' ') + '\n';
    };

    eval(transpiledJs);
    console.log = originalLog;
  } catch (err) {
    output += `\nTypeScript Error: ${err.message}\n[HINTS]\nTypeScript compile error. Check interface compatibility and type declarations.`;
  }
  return output;
}

// --- NVIDIA NIM Virtual Compiler & Executor Engine ---
async function runViaLlamaCompiler(code, lang, inputs) {
  try {
    const response = await fetch("/api/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code, lang, inputs })
    });

    const data = await response.json();
    if (data.output) {
      return data.output;
    } else {
      return `Execution Error: ${data.error || 'Unable to execute code.'}\n[HINTS]\nCheck the local server console log for diagnostic details.`;
    }
  } catch (err) {
    return `Compiler Connection Error: ${err.message}\n[HINTS]\nEnsure your local Node Express proxy server is active on port 8000.`;
  }
}

// Helper to push text chunk to console during execution
function printToTerminal(text) {
  const log = document.getElementById('terminal-log');
  log.innerHTML += text;
  log.scrollTop = log.scrollHeight;
}

// Scan code to detect input prompts and ask user in-terminal
async function collectTerminalInputs(code) {
  const lines = code.split('\n');
  let inputs = [];
  
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('//') || line.startsWith('#') || line.startsWith('/*')) continue;
    
    if (line.includes('scanf') || line.includes('cin >>') || line.includes('scanner.nextLine') || line.includes('fgets(STDIN)') || line.includes('Console.ReadLine') || line.includes('input(')) {
      let promptLabel = "stdin: ";
      
      let cppMatch = line.match(/cin\s*>>\s*([a-zA-Z0-9_]+)/);
      let scanfMatch = line.match(/scanf\(\"[^\"]+\",\s*&([a-zA-Z0-9_]+)\)/);
      let scannerMatch = line.match(/(?:String|int|double)?\s*([a-zA-Z0-9_]+)\s*=\s*scanner\./);
      let phpMatch = line.match(/\$([a-zA-Z0-9_]+)\s*=\s*(?:fgets|trim)/);
      let csharpMatch = line.match(/(?:string|var)?\s*([a-zA-Z0-9_]+)\s*=\s*Console\.ReadLine/);
      let pythonMatch = line.match(/([a-zA-Z0-9_\$]+)\s*=\s*(?:int\(|float\()?\s*input\(\s*(?:\"([^\"]+)\"|\'([^\']+)\')?\s*\)\s*\)?/);

      if (cppMatch) { promptLabel = "cin >> "; }
      else if (scanfMatch) { promptLabel = "scanf: "; }
      else if (scannerMatch) { promptLabel = "scanner.nextLine: "; }
      else if (phpMatch) { promptLabel = "PHP fgets(STDIN): "; }
      else if (csharpMatch) { promptLabel = "Console.ReadLine: "; }
      else if (pythonMatch) { promptLabel = pythonMatch[2] || pythonMatch[3] || "input: "; }

      let userInput = await readTerminalInput(promptLabel);
      inputs.push(userInput);
    }
  }
  return inputs;
}

// --- Compiler trigger click handler ---
const runBtn = document.getElementById('run-button');
const terminalLog = document.getElementById('terminal-log');

runBtn.addEventListener('click', async () => {
  if (!editor) return;
  const codeVal = editor.getValue();

  // Save current code to DB
  codeCache[currentLang] = codeVal;
  saveCodeToDb(currentLang, codeVal);

  // Increment session stats
  sessionStats.compiles++;
  sessionStats.linesWritten = Math.max(sessionStats.linesWritten, codeVal.split('\n').length);
  
  if (sessionStats.activeChallengeId && !solvedChallenges.has(sessionStats.activeChallengeId)) {
    solvedChallenges.add(sessionStats.activeChallengeId);
    sessionStats.solvedCount = solvedChallenges.size;
  }
  updateStatsDOM();
  saveStatsToDb();

  // Trigger AI static code analysis in the background
  if (codeVal.trim()) {
    triggerDiagnostics(codeVal, currentLang);
  }

  terminalLog.innerHTML = `<div class="terminal-header-meta">BugSence Output Terminal v1.0.0. Processing...</div>`;

  if (currentLang === 'html') {
    const parser = new DOMParser();
    const doc = parser.parseFromString(codeVal, 'text/html');
    const title = doc.title || "HTML Document";
    const bodyText = doc.body ? doc.body.innerText.trim() : doc.documentElement.innerText.trim();

    terminalLog.innerHTML += `=== HTML Text Output: ${escapeHTML(title)} ===\n${bodyText ? escapeHTML(bodyText) : "[No visible text content in body]"}\n\n<span style="color: var(--text-muted);">--- HTML run finished ---</span>`;
    return;
  }

  // Pre-collect live inputs in the terminal if the program requests standard input
  const inputsCollected = await collectTerminalInputs(codeVal);

  showLoader("Executing code in sandbox...");

  let result = "";
  if (currentLang === 'sql') {
    result = await runSqlLocal(codeVal);
    hideLoader();
    printToTerminal(formatCompilerOutput(result, true) + `\n<span style="color: var(--text-muted);">--- Database query finished ---</span>`);
  } else if (currentLang === 'typescript') {
    result = runTypescriptLocal(codeVal);
    hideLoader();
    printToTerminal(formatCompilerOutput(result) + `\n<span style="color: var(--text-muted);">--- Program Terminated with Exit Code 0 ---</span>`);
  } else if (currentLang === 'javascript') {
    result = runJavascriptLocal(codeVal);
    hideLoader();
    printToTerminal(formatCompilerOutput(result) + `\n<span style="color: var(--text-muted);">--- Program Terminated with Exit Code 0 ---</span>`);
  } else {
    // Systems languages + Python run via NVIDIA NIM Llama-3.1-8b-instruct virtual compiler!
    const rawResult = await runViaLlamaCompiler(codeVal, currentLang, inputsCollected);
    hideLoader();
    printToTerminal(formatCompilerOutput(rawResult) + `\n<span style="color: var(--text-muted);">--- Program Terminated with Exit Code 0 ---</span>\n`);
  }
});

// Helper to escape HTML values
function escapeHTML(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// Markdown formatting parser
function formatMarkdown(text) {
  text = text.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre style="background: rgba(0, 0, 0, 0.3); padding: 10px; border-radius: 8px; margin: 8px 0; font-family: var(--font-code); font-size: 0.85rem; color: #fff; overflow-x: auto;"><code>${escapeHTML(code.trim())}</code></pre>`;
  });
  text = text.replace(/`([^`]+)`/g, '<code style="font-family: var(--font-code); background: rgba(255, 255, 255, 0.08); padding: 2px 6px; border-radius: 4px; font-size: 0.85rem; color: #34d399;">$1</code>');
  return text.replace(/\n/g, '<br>');
}

// Format the virtual compiler output, highlighting the [HINTS] box beautifully
function formatCompilerOutput(result, isHtml = false) {
  if (result.includes('[HINTS]')) {
    let parts = result.split('[HINTS]');
    let stdoutPart = parts[0];
    let hintsPart = parts[1];
    
    return (isHtml ? stdoutPart : escapeHTML(stdoutPart)) + 
      `\n\n<div style="background: rgba(245, 158, 11, 0.07); border-left: 4px solid var(--warning); padding: 15px; border-radius: 6px; margin: 10px 0; font-family: var(--font-body); text-align: left;">` +
      `<span style="color: var(--warning); font-weight: 700; display: block; margin-bottom: 8px; font-size: 0.92rem;"><i class="fa-solid fa-lightbulb"></i> AI Debugging Hints:</span>` +
      `<span style="color: var(--text-main); font-size: 0.88rem; line-height: 1.5; display: block;">${formatMarkdown(hintsPart)}</span>` +
      `</div>`;
  }
  return isHtml ? result : escapeHTML(result);
}

// --- Draggable Split Resizer Logic ---
const splitter = document.getElementById('drag-splitter');
const workspace = document.querySelector('.ide-workspace');
let isDragging = false;

splitter.addEventListener('mousedown', (e) => {
  isDragging = true;
  document.body.style.cursor = 'col-resize';
  splitter.classList.add('dragging');
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const sidebarWidth = 250; // Sidebar is fixed width
  const totalWidth = window.innerWidth;
  const remainingWidth = totalWidth - sidebarWidth;

  // Calculate split percentage
  const editorWidth = e.clientX - sidebarWidth;
  const editorPercent = (editorWidth / remainingWidth) * 100;

  if (editorPercent > 10 && editorPercent < 90) {
    workspace.style.gridTemplateColumns = `250px ${editorPercent}% 6px 1fr`;
  }
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    document.body.style.cursor = 'default';
    splitter.classList.remove('dragging');
  }
});

// ==========================================================================
// BugSence AI Coding Mentor & Student Dashboard Core Client Logic
// ==========================================================================

// --- Student Education & AI Mentor State ---
let sessionStats = {
  compiles: 0,
  linesWritten: 0,
  solvedCount: 0,
  activeChallengeId: null
};

let masteredConcepts = {
  'Variables': 0,
  'Conditionals': 0,
  'Loops': 0,
  'Functions': 0,
  'Arrays/Lists': 0
};

let solvedChallenges = new Set();
let chatHistory = [];

// --- 1. Workspace Views Toggle Controller ---
const toggleIdeBtn = document.getElementById('toggle-ide-btn');
const toggleDashBtn = document.getElementById('toggle-dash-btn');
const ideWorkspace = document.querySelector('.ide-workspace');
const dashboardView = document.getElementById('dashboard-view');

toggleIdeBtn.addEventListener('click', () => {
  toggleIdeBtn.classList.add('active');
  toggleDashBtn.classList.remove('active');
  ideWorkspace.style.display = 'grid';
  dashboardView.style.display = 'none';
  if (editor) {
    editor.layout();
  }
});

toggleDashBtn.addEventListener('click', () => {
  toggleDashBtn.classList.add('active');
  toggleIdeBtn.classList.remove('active');
  ideWorkspace.style.display = 'none';
  dashboardView.style.display = 'flex';
});

// --- 2. Output Tab Panel Switcher ---
const tabTerminalBtn = document.getElementById('tab-terminal-btn');
const tabMentorBtn = document.getElementById('tab-mentor-btn');
const contentTerminal = document.getElementById('content-terminal');
const contentMentor = document.getElementById('content-mentor');

tabTerminalBtn.addEventListener('click', () => {
  tabTerminalBtn.classList.add('active');
  tabMentorBtn.classList.remove('active');
  contentTerminal.classList.add('active');
  contentMentor.classList.remove('active');
});

tabMentorBtn.addEventListener('click', () => {
  tabMentorBtn.classList.add('active');
  tabTerminalBtn.classList.remove('active');
  contentMentor.classList.add('active');
  contentTerminal.classList.remove('active');
  // Auto-focus chat input
  document.getElementById('ai-chat-input').focus();
});

// --- 3. Stats & Diagnostics Update Logic ---
function updateStatsDOM() {
  document.getElementById('stat-lines').textContent = sessionStats.linesWritten;
  document.getElementById('stat-compiles').textContent = sessionStats.compiles;
  document.getElementById('stat-challenges').textContent = `${sessionStats.solvedCount}/${studentChallenges.length}`;
}

async function triggerDiagnostics(code, lang) {
  try {
    const response = await fetch("/api/diagnose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, lang })
    });
    const data = await response.json();
    if (data && !data.error) {
      updateDashboardWithDiagnostics(data);
    }
  } catch (err) {
    console.error("Diagnostics execution error:", err);
  }
}

function updateDashboardWithDiagnostics(data) {
  // Update Health Score Ring
  const score = data.codeHealthScore || 0;
  document.getElementById('health-score-val').textContent = score;
  
  const ring = document.getElementById('health-ring');
  const circumference = 2 * Math.PI * 34; // 213.6
  const offset = circumference - (score / 100) * circumference;
  ring.style.strokeDashoffset = offset;
  
  // Health Rating Text
  const healthLevelEl = document.getElementById('health-level');
  if (score >= 90) {
    healthLevelEl.textContent = "Excellent Code Quality";
    healthLevelEl.style.color = "var(--success)";
    ring.setAttribute('stroke', 'var(--success)');
  } else if (score >= 75) {
    healthLevelEl.textContent = "Good Structure";
    healthLevelEl.style.color = "var(--accent-secondary)";
    ring.setAttribute('stroke', 'var(--accent-secondary)');
  } else if (score >= 50) {
    healthLevelEl.textContent = "Fair - Needs Improvements";
    healthLevelEl.style.color = "var(--warning)";
    ring.setAttribute('stroke', 'var(--warning)');
  } else {
    healthLevelEl.textContent = "Critical Issues Found";
    healthLevelEl.style.color = "var(--error)";
    ring.setAttribute('stroke', 'var(--error)');
  }

  // Update Complexity Level
  document.getElementById('stat-complexity').textContent = data.complexityLevel || "Beginner";

  // Concept Mastery progress
  if (data.detectedConcepts && Array.isArray(data.detectedConcepts)) {
    data.detectedConcepts.forEach(c => {
      // Map concepts to progress bars
      if (c.includes("Variables") || c.includes("Variable") || c.includes("Types")) {
        masteredConcepts['Variables'] = 100;
      }
      if (c.includes("Conditionals") || c.includes("Conditional") || c.includes("if")) {
        masteredConcepts['Conditionals'] = 100;
      }
      if (c.includes("Loops") || c.includes("Loop") || c.includes("Recursion")) {
        masteredConcepts['Loops'] = 100;
      }
      if (c.includes("Functions") || c.includes("Function") || c.includes("Scope")) {
        masteredConcepts['Functions'] = 100;
      }
      if (c.includes("Arrays") || c.includes("Lists") || c.includes("Structures") || c.includes("Database")) {
        masteredConcepts['Arrays/Lists'] = 100;
      }
    });
  }

  // Update Concept Progress Bars in Dashboard DOM
  document.getElementById('mast-vars').style.width = masteredConcepts['Variables'] + '%';
  document.getElementById('mast-vars-pct').textContent = masteredConcepts['Variables'] + '%';
  
  document.getElementById('mast-cond').style.width = masteredConcepts['Conditionals'] + '%';
  document.getElementById('mast-cond-pct').textContent = masteredConcepts['Conditionals'] + '%';
  
  document.getElementById('mast-loops').style.width = masteredConcepts['Loops'] + '%';
  document.getElementById('mast-loops-pct').textContent = masteredConcepts['Loops'] + '%';
  
  document.getElementById('mast-funcs').style.width = masteredConcepts['Functions'] + '%';
  document.getElementById('mast-funcs-pct').textContent = masteredConcepts['Functions'] + '%';
  
  document.getElementById('mast-arrays').style.width = masteredConcepts['Arrays/Lists'] + '%';
  document.getElementById('mast-arrays-pct').textContent = masteredConcepts['Arrays/Lists'] + '%';

  // Logical Pitfalls alert box
  document.getElementById('dashboard-bug-box').innerHTML = formatMarkdown(data.potentialBugs || "None detected");

  // Mentor roadmap feedback
  document.getElementById('dashboard-mentor-feedback').innerHTML = formatMarkdown(data.mentorFeedback || "Keep coding!");

  // Save concepts and stats to DB
  saveConceptsToDb();
  saveStatsToDb();

  // Achievements evaluation
  checkBadges(score, data.detectedConcepts || []);
}

function checkBadges(score, concepts) {
  if (sessionStats.compiles >= 1) {
    unlockBadge('badge-first');
  }
  
  const hasLoops = concepts.some(c => c.toLowerCase().includes('loop') || c.toLowerCase().includes('recursion'));
  if (hasLoops) {
    unlockBadge('badge-loop');
  }
  
  if (score >= 90) {
    unlockBadge('badge-clean');
  }
  
  if (score >= 80 && sessionStats.compiles >= 3) {
    unlockBadge('badge-bug');
  }
}

function unlockBadge(id) {
  const el = document.getElementById(id);
  if (el && el.classList.contains('locked')) {
    el.classList.remove('locked');
    el.classList.add('unlocked');
  }
}

// --- 4. Socratic AI Mentor Chat Panel Controller ---
const aiChatInput = document.getElementById('ai-chat-input');
const aiSendBtn = document.getElementById('ai-send-btn');
const mentorMessagesContainer = document.getElementById('mentor-chat-messages');

aiSendBtn.addEventListener('click', () => {
  const msg = aiChatInput.value.trim();
  if (msg) {
    aiChatInput.value = '';
    sendMessageToMentor(msg);
  }
});

aiChatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const msg = aiChatInput.value.trim();
    if (msg) {
      aiChatInput.value = '';
      sendMessageToMentor(msg);
    }
  }
});

// Mentor Quick prompt action chips
document.getElementById('chip-explain').addEventListener('click', () => {
  sendMessageToMentor("Explain how my code works and break down its structural logic.");
});
document.getElementById('chip-hint').addEventListener('click', () => {
  sendMessageToMentor("I'm stuck. Can you give me a Socratic hint to help me figure out the next step without writing the code for me?");
});
document.getElementById('chip-bugs').addEventListener('click', () => {
  sendMessageToMentor("Analyze my code and find potential logical bugs or edge case problems.");
});

const clearChip = document.getElementById('chip-clear');
if (clearChip) {
  clearChip.addEventListener('click', async () => {
    mentorMessagesContainer.innerHTML = '';
    appendMessageBubble("assistant", `👋 Hello! I am your <strong>BugSence AI Coding Mentor</strong>.<br><br>Write code in the editor and click "Run Code" to compile. If there is an error, I will diagnose it and help you learn. You can also ask me questions here, ask for hints, or get coding feedback!`);
    chatHistory = [];
    try {
      await fetch('/api/db/clear-chat', { method: 'POST' });
    } catch (e) {
      console.warn("Could not clear database chat:", e);
    }
  });
}

async function sendMessageToMentor(studentMsg) {
  // Render user bubble
  appendMessageBubble("user", escapeHTML(studentMsg));
  saveChatMessageToDb("user", studentMsg);
  
  // Render loading assistant bubble
  const loadingBubble = appendMessageBubble("assistant", `
    <div style="display: flex; align-items: center; gap: 8px;">
      <i class="fa-solid fa-circle-notch" style="animation: spin 1s linear infinite;"></i>
      <span>Mentor is thinking...</span>
    </div>
  `);

  const codeVal = editor ? editor.getValue() : '';

  try {
    const response = await fetch("/api/mentor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: codeVal,
        lang: currentLang,
        message: studentMsg,
        history: chatHistory
      })
    });
    
    const data = await response.json();
    loadingBubble.remove();

    if (data && data.output) {
      appendMessageBubble("assistant", formatMarkdown(data.output));
      chatHistory.push({ role: "user", content: studentMsg });
      chatHistory.push({ role: "assistant", content: data.output });
      saveChatMessageToDb("assistant", data.output);
    } else {
      appendMessageBubble("assistant", "Sorry, I had trouble communicating with the API. Please try again.");
    }
  } catch (err) {
    loadingBubble.remove();
    appendMessageBubble("assistant", `Connection error: ${err.message}. Make sure the proxy server is running.`);
  }
}

function appendMessageBubble(role, htmlContent) {
  const bubble = document.createElement('div');
  bubble.className = `ai-message ${role}`;
  bubble.innerHTML = `<div class="ai-message-inner">${htmlContent}</div>`;
  mentorMessagesContainer.appendChild(bubble);
  mentorMessagesContainer.scrollTop = mentorMessagesContainer.scrollHeight;
  return bubble;
}

// --- 5. Practice Coding Challenges Controller ---
const studentChallenges = [
  {
    id: "fact",
    title: "Calculate Factorial",
    difficulty: "easy",
    lang: "python",
    desc: "Write a function to calculate the factorial of a number.",
    code: `def factorial(n):
    # Write your recursive or iterative code here
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Test cases
print("Factorial of 5:", factorial(5)) # Expected: 120
`
  },
  {
    id: "rev",
    title: "Reverse a String",
    difficulty: "easy",
    lang: "javascript",
    desc: "Write a function to reverse a string in-place or return a reversed string.",
    code: `function reverseString(str) {
    // Write your string reversing logic here
    return str.split("").reverse().join("");
}

console.log("Reversed 'hello':", reverseString("hello")); // Expected: 'olleh'
`
  },
  {
    id: "prime",
    title: "Check Prime Number",
    difficulty: "medium",
    lang: "typescript",
    desc: "Write a function that checks if a given number is prime.",
    code: `function isPrime(n: number): boolean {
    // Write logic to check if n is prime
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

console.log("Is 17 prime?:", isPrime(17)); // Expected: true
console.log("Is 15 prime?:", isPrime(15)); // Expected: false
`
  },
  {
    id: "fib",
    title: "Fibonacci Sequence",
    difficulty: "medium",
    lang: "python",
    desc: "Generate the first N Fibonacci numbers.",
    code: `def fibonacci(n):
    # Return a list of first n Fibonacci numbers
    if n <= 0: return []
    if n == 1: return [0]
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq

print("First 8 Fib numbers:", fibonacci(8))
# Expected: [0, 1, 1, 2, 3, 5, 8, 13]
`
  },
  {
    id: "sql-devs",
    title: "Filter Senior Devs",
    difficulty: "hard",
    lang: "sql",
    desc: "Write a query to list all developers with experience >= 5 from the DEVELOPERS table.",
    code: `-- Starter tables are already configured.
-- Select all columns for developers with experience >= 5

SELECT * FROM DEVELOPERS WHERE experience >= 5;
`
  }
];

const challengesContainer = document.getElementById('challenges-list-container');

function initChallengesList() {
  challengesContainer.innerHTML = '';
  studentChallenges.forEach(ch => {
    const li = document.createElement('li');
    li.className = 'challenge-item';
    li.setAttribute('data-id', ch.id);
    li.innerHTML = `
      <div class="challenge-title">
        <span>${ch.title}</span>
        <span class="challenge-lang">${ch.lang}</span>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:2px;">
        <span class="challenge-difficulty ${ch.difficulty}">${ch.difficulty}</span>
      </div>
    `;
    li.addEventListener('click', () => loadChallenge(ch));
    challengesContainer.appendChild(li);
  });
}

function loadChallenge(challenge) {
  // Mark active in challenge list sidebar
  document.querySelectorAll('.challenge-item').forEach(el => {
    if (el.getAttribute('data-id') === challenge.id) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // Switch to correct language selector
  const langItem = Array.from(document.querySelectorAll('.language-item'))
    .find(item => item.getAttribute('data-lang') === challenge.lang);
  
  if (langItem) {
    if (editor) {
      codeCache[currentLang] = editor.getValue();
    }
    
    document.querySelectorAll('.language-item').forEach(i => i.classList.remove('active'));
    langItem.classList.add('active');
    
    currentLang = challenge.lang;
    const monacoMode = langItem.getAttribute('data-mode');
    
    if (editor) {
      editor.setValue(challenge.code);
      monaco.editor.setModelLanguage(editor.getModel(), monacoMode);
    }
    
    codeCache[currentLang] = challenge.code;
    const extName = fileExtensions[currentLang];
    editorTitle.innerHTML = `<i class="${langItem.querySelector('i').className}"></i> ${extName}`;
  }

  // Update state active challenge ID
  sessionStats.activeChallengeId = challenge.id;
  saveStatsToDb();
  
  // Notify student in AI mentor panel
  appendMessageBubble("assistant", `📖 You have loaded the **${challenge.title}** challenge in **${challenge.lang}**.<br><strong>Goal:</strong> ${challenge.desc}<br><br>Write your solution in the editor and click <strong>Run Code</strong>!`);
  
  // Switch pane to AI Mentor to display information
  tabMentorBtn.click();
}

// Initialize on startup
initChallengesList();
updateStatsDOM();

// --- Database Connection API Integration Helpers ---

async function saveCodeToDb(lang, code) {
  try {
    await fetch("/api/db/code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang, code })
    });
  } catch (err) {
    console.error("Failed to save code to db:", err);
  }
}

async function saveStatsToDb() {
  try {
    await fetch("/api/db/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sessionStats)
    });
  } catch (err) {
    console.error("Failed to save stats to db:", err);
  }
}

async function saveConceptsToDb() {
  try {
    await fetch("/api/db/concept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(masteredConcepts)
    });
  } catch (err) {
    console.error("Failed to save concepts to db:", err);
  }
}

async function saveChatMessageToDb(role, content) {
  try {
    await fetch("/api/db/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, content })
    });
  } catch (err) {
    console.error("Failed to save chat message to db:", err);
  }
}

async function initDatabaseState() {
  try {
    const response = await fetch("/api/db/init");
    const data = await response.json();
    if (data) {
      // Restore profile
      if (data.profile) {
        document.getElementById('student-name').textContent = data.profile.name || "Tamil";
      }
      
      // Restore stats
      if (data.stats) {
        sessionStats = { ...sessionStats, ...data.stats };
      }
      
      // Restore mastered concepts
      if (data.masteredConcepts) {
        masteredConcepts = { ...masteredConcepts, ...data.masteredConcepts };
      }
      
      // Restore code cache (merge with templates)
      if (data.codeCache) {
        codeCache = { ...templates, ...data.codeCache };
      }
      
      // Update editor content with the cached code for current language if editor is ready
      if (editor) {
        editor.setValue(codeCache[currentLang]);
      }
      
      // Restore chat history
      if (data.chatHistory && Array.isArray(data.chatHistory)) {
        chatHistory = data.chatHistory;
        // Populate chat bubbles
        mentorMessagesContainer.innerHTML = '';
        if (chatHistory.length === 0) {
          // If empty, append the welcome message
          appendMessageBubble("assistant", `👋 Hello! I am your <strong>BugSence AI Coding Mentor</strong>.<br><br>Write code in the editor and click "Run Code" to compile. If there is an error, I will diagnose it and help you learn. You can also ask me questions here, ask for hints, or get coding feedback!`);
        } else {
          chatHistory.forEach(msg => {
            if (msg.role === 'user') {
              appendMessageBubble("user", escapeHTML(msg.content));
            } else {
              appendMessageBubble("assistant", formatMarkdown(msg.content));
            }
          });
        }
      }
      
      // Update stats UI
      updateStatsDOM();
      
      // Update dashboard UI progress bars
      document.getElementById('mast-vars').style.width = masteredConcepts['Variables'] + '%';
      document.getElementById('mast-vars-pct').textContent = masteredConcepts['Variables'] + '%';
      document.getElementById('mast-cond').style.width = masteredConcepts['Conditionals'] + '%';
      document.getElementById('mast-cond-pct').textContent = masteredConcepts['Conditionals'] + '%';
      document.getElementById('mast-loops').style.width = masteredConcepts['Loops'] + '%';
      document.getElementById('mast-loops-pct').textContent = masteredConcepts['Loops'] + '%';
      document.getElementById('mast-funcs').style.width = masteredConcepts['Functions'] + '%';
      document.getElementById('mast-funcs-pct').textContent = masteredConcepts['Functions'] + '%';
      document.getElementById('mast-arrays').style.width = masteredConcepts['Arrays/Lists'] + '%';
      document.getElementById('mast-arrays-pct').textContent = masteredConcepts['Arrays/Lists'] + '%';

      // Check badges
      checkBadges(0, []);
    }
  } catch (err) {
    console.error("Failed to load database state:", err);
  }
}

// Wire up editable profile name click handler
const studentNameEl = document.getElementById('student-name');
if (studentNameEl) {
  studentNameEl.addEventListener('click', async () => {
    const newName = prompt("Enter your name:", studentNameEl.textContent);
    if (newName && newName.trim()) {
      studentNameEl.textContent = newName.trim();
      try {
        await fetch("/api/db/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newName.trim() })
        });
      } catch (err) {
        console.error("Failed to save profile name:", err);
      }
    }
  });
  studentNameEl.style.cursor = 'pointer';
  studentNameEl.style.borderBottom = '1px dashed var(--accent-primary)';
  studentNameEl.title = "Click to edit name";
}

// Wire up Reset database / progress button click handler
const resetDbBtn = document.getElementById('reset-db-btn');
if (resetDbBtn) {
  resetDbBtn.addEventListener('click', async () => {
    if (confirm("Are you sure you want to reset all your progress, coding stats, and AI chat history? This cannot be undone.")) {
      try {
        await fetch("/api/db/reset", { method: "POST" });
        alert("Progress reset successfully!");
        window.location.reload();
      } catch (err) {
        console.error("Failed to reset progress:", err);
      }
    }
  });
}

// --- Live Server Health Heartbeat & Auto-Reconnect ---
const serverStatusPill = document.getElementById('server-status-pill');
const serverStatusText = document.getElementById('server-status-text');

async function pingServer() {
  try {
    const res = await fetch("/api/db/init", { cache: "no-store" });
    if (res.ok) {
      if (serverStatusPill) {
        serverStatusPill.className = "server-status-pill online";
        serverStatusText.textContent = "Server Online";
      }
    } else {
      throw new Error("Server returned non-200");
    }
  } catch (err) {
    if (serverStatusPill) {
      serverStatusPill.className = "server-status-pill connecting";
      serverStatusText.textContent = "Connecting...";
    }
  }
}

setInterval(pingServer, 6000);
pingServer();


