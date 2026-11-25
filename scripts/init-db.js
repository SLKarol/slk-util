const { app } = require("electron");
const path = require("node:path");
const fs = require("node:fs");
const Database = require("better-sqlite3");

// Фиксируем имя, чтобы app.getPath('userData') вел строго в .../AppData/Roaming/slk-utils
app.setName("slk-utils");

app.whenReady().then(() => {
  try {
    const userDataPath = app.getPath("userData");
    fs.mkdirSync(userDataPath, { recursive: true });

    const dbPath = path.join(userDataPath, "app.db");
    console.log(`[DB:INIT] Путь к базе данных: ${dbPath}`);

    const db = new Database(dbPath);

    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    db.pragma("synchronous = NORMAL");

    db.exec(`
      CREATE TABLE IF NOT EXISTS banned_authors (
        login TEXT PRIMARY KEY NOT NULL
      ) WITHOUT ROWID;
    `);

    db.close();
    console.log("[DB:INIT] Таблица banned_authors успешно инициализирована.");
    app.exit(0);
  } catch (error) {
    console.error("[DB:INIT] Критическая ошибка:", error);
    app.exit(1);
  }
});
