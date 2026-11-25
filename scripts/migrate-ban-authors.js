const { app } = require("electron");
const path = require("node:path");
const fs = require("node:fs");
const Database = require("better-sqlite3");

app.setName("slk-utils");

app.whenReady().then(() => {
  try {
    const userDataPath = app.getPath("userData");
    const jsonPath = path.join(userDataPath, "banAuthor.json");
    const dbPath = path.join(userDataPath, "app.db");

    if (!fs.existsSync(jsonPath)) {
      console.log(
        `[DB:MIGRATE] Файл не найден: ${jsonPath}. Миграция пропущена.`,
      );
      app.exit(0);
    }

    if (!fs.existsSync(dbPath)) {
      console.error(
        `[DB:MIGRATE] БД не найдена: ${dbPath}. Сначала выполните npm run db:init.`,
      );
      app.exit(1);
    }

    const rawData = fs.readFileSync(jsonPath, "utf-8");
    const parsed = JSON.parse(rawData);

    if (!Array.isArray(parsed)) {
      throw new Error("Ожидался массив строк в banAuthor.json");
    }

    // Фильтруем только непустые валидные строки
    const logins = parsed.filter(
      (item) => typeof item === "string" && item.trim().length > 0,
    );

    const db = new Database(dbPath, { fileMustExist: true });
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");

    const insertStmt = db.prepare(
      "INSERT OR IGNORE INTO banned_authors (login) VALUES (?)",
    );
    let insertedCount = 0;

    const migrateTransaction = db.transaction((items) => {
      for (const login of items) {
        const info = insertStmt.run(login.trim());
        insertedCount += info.changes;
      }
    });

    migrateTransaction(logins);
    db.close();

    console.log(`[DB:MIGRATE] Завершено.`);
    console.log(`  - Всего записей в JSON: ${parsed.length}`);
    console.log(`  - Перенесено новых записей в БД: ${insertedCount}`);
    console.log(
      `  - Проигнорировано дубликатов/невалидных: ${parsed.length - insertedCount}`,
    );

    app.exit(0);
  } catch (error) {
    console.error("[DB:MIGRATE] Ошибка миграции:", error);
    app.exit(1);
  }
});
