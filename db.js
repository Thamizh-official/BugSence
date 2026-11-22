const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'database.json');

// Default initial database structure
const DEFAULT_DATA = {
  profile: {
    name: "Tamil",
    role: "Senior Dev"
  },
  stats: {
    compiles: 0,
    linesWritten: 0,
    solvedCount: 0,
    activeChallengeId: null
  },
  masteredConcepts: {
    'Variables': 0,
    'Conditionals': 0,
    'Loops': 0,
    'Functions': 0,
    'Arrays/Lists': 0
  },
  chatHistory: [],
  codeCache: {}
};

// Reads data from the JSON database file
function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      writeDb(DEFAULT_DATA);
      return DEFAULT_DATA;
    }
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database file, returning default data:", err);
    return DEFAULT_DATA;
  }
}

// Writes data to the JSON database file
function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error("Error writing to database file:", err);
    return false;
  }
}

module.exports = {
  // Get entire database state
  getAll: () => {
    return readDb();
  },

  // Save profile settings
  saveProfile: (profile) => {
    const db = readDb();
    db.profile = { ...db.profile, ...profile };
    writeDb(db);
    return db.profile;
  },

  // Save compile stats
  saveStats: (stats) => {
    const db = readDb();
    db.stats = { ...db.stats, ...stats };
    writeDb(db);
    return db.stats;
  },

  // Save concept mastery percentages
  saveMasteredConcepts: (concepts) => {
    const db = readDb();
    db.masteredConcepts = { ...db.masteredConcepts, ...concepts };
    writeDb(db);
    return db.masteredConcepts;
  },

  // Append a chat message to history
  appendChatMessage: (role, content) => {
    const db = readDb();
    db.chatHistory.push({
      role,
      content,
      timestamp: new Date().toISOString()
    });
    // Cap chat history to last 50 messages to keep the file lightweight
    if (db.chatHistory.length > 50) {
      db.chatHistory.shift();
    }
    writeDb(db);
    return db.chatHistory;
  },

  // Save editor code cache for a specific language
  saveCodeCache: (lang, code) => {
    const db = readDb();
    if (!db.codeCache) db.codeCache = {};
    db.codeCache[lang] = code;
    writeDb(db);
    return db.codeCache;
  },

  // Clear chat history only
  clearChatHistory: () => {
    const db = readDb();
    db.chatHistory = [];
    writeDb(db);
    return [];
  },

  // Reset stats and chat history back to defaults
  resetAll: () => {
    const db = readDb();
    db.stats = { ...DEFAULT_DATA.stats };
    db.masteredConcepts = { ...DEFAULT_DATA.masteredConcepts };
    db.chatHistory = [];
    db.codeCache = {};
    writeDb(db);
    return db;
  }
};

// Auto-initialize database file on startup if it doesn't exist
readDb();
