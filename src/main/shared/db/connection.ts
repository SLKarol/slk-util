import { app } from "electron";
import path from "node:path";
import Database from "better-sqlite3";

/**
 * Хранит уже инициализированное соединение с базой данных.
 * Используется для повторного доступа к одной и той же БД.
 */
let dbInstance: Database.Database | null = null;

/**
 * Возвращает активное соединение с базой данных.
 * При первом обращении создаёт и настраивает соединение с базой данных.
 */
export function getDatabase(): Database.Database {
  if (!dbInstance) {
    const dbPath = path.join(app.getPath("userData"), "app.db");

    // fileMustExist: true гарантирует, что БД не создастся пустой в рантайме
    dbInstance = new Database(dbPath, { fileMustExist: true });
    dbInstance.pragma("journal_mode = WAL");
    dbInstance.pragma("foreign_keys = ON");
    dbInstance.pragma("synchronous = NORMAL");
  }

  return dbInstance;
}

/**
 * Закрывает активное соединение с базой данных, если оно существует.
 */
export function closeDatabase(): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}
