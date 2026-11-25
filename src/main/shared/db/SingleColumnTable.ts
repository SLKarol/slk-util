import type Database from "better-sqlite3";
import { getDatabase } from "./connection";

/**
 * Универсальный типизированный репозиторий для работы с одноколоночными таблицами SQLite.
 * Использует кэшированные Prepared Statements для максимальной производительности.
 *
 * @template T Тип строковых значений, хранимых в колонке.
 */
export class SingleColumnTable<T extends string = string> {
  private readonly db: Database.Database;
  private readonly insertStmt: Database.Statement<[T]>;
  private readonly deleteStmt: Database.Statement<[T]>;
  private readonly selectAllStmt: Database.Statement<[], T>;
  private readonly selectAllJsonStmt: Database.Statement<[], string>;
  private readonly countStmt: Database.Statement<[], number>;
  private readonly filterExistingStmt: Database.Statement<[string], T>;
  private readonly insertManyTx: (items: readonly T[]) => number;

  /**
   * Создает экземпляр обертки над одноколоночной таблицей.
   *
   * @param tableName Имя таблицы в базе данных.
   * @param columnName Имя единственной колонки в таблице.
   * @throws {Error} Если имя таблицы или колонки содержит недопустимые символы.
   */
  constructor(tableName: string, columnName: string) {
    if (
      !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName) ||
      !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(columnName)
    ) {
      throw new Error(`Invalid SQL identifier: ${tableName}.${columnName}`);
    }

    this.db = getDatabase();

    this.insertStmt = this.db.prepare(
      `INSERT OR IGNORE INTO ${tableName} (${columnName}) VALUES (?)`,
    );

    this.deleteStmt = this.db.prepare(
      `DELETE FROM ${tableName} WHERE ${columnName} = ?`,
    );

    this.selectAllStmt = this.db
      .prepare(`SELECT ${columnName} FROM ${tableName}`)
      .pluck() as Database.Statement<[], T>;

    this.selectAllJsonStmt = this.db
      .prepare(
        `SELECT COALESCE(json_group_array(${columnName}), '[]') FROM ${tableName}`,
      )
      .pluck() as Database.Statement<[], string>;

    this.countStmt = this.db
      .prepare(`SELECT COUNT(*) FROM ${tableName}`)
      .pluck() as Database.Statement<[], number>;

    // Используем json_each(?) для безопасного и быстрого пересечения входного массива с PRIMARY KEY таблицы
    this.filterExistingStmt = this.db
      .prepare(
        `SELECT t.${columnName}
         FROM ${tableName} AS t
         INNER JOIN json_each(?) AS input ON t.${columnName} = input.value`,
      )
      .pluck() as Database.Statement<[string], T>;

    this.insertManyTx = this.db.transaction((items: readonly T[]) => {
      let inserted = 0;
      for (const item of items) {
        inserted += this.insertStmt.run(item).changes;
      }
      return inserted;
    });
  }

  /**
   * Добавляет одну запись в таблицу. Дубликаты молча игнорируются.
   *
   * @param value Значение для вставки.
   * @returns `true`, если запись была добавлена, или `false`, если она уже существовала.
   */
  public add(value: T): boolean {
    return this.insertStmt.run(value).changes > 0;
  }

  /**
   * Пакетно добавляет массив записей в рамках одной транзакции.
   *
   * @param values Массив значений для вставки.
   * @returns Количество реально добавленных новых записей (без учета дубликатов).
   */
  public addMany(values: readonly T[]): number {
    if (values.length === 0) return 0;
    return this.insertManyTx(values);
  }

  /**
   * Удаляет запись из таблицы.
   *
   * @param value Значение для удаления.
   * @returns `true`, если запись существовала и была удалена, иначе `false`.
   */
  public remove(value: T): boolean {
    return this.deleteStmt.run(value).changes > 0;
  }

  /**
   * Возвращает все записи из таблицы в виде плоского массива.
   *
   * @returns Массив всех значений из колонки.
   */
  public readAll(): T[] {
    return this.selectAllStmt.all();
  }

  /**
   * Возвращает все записи из таблицы в виде готовой JSON-строки массива (например, `'["a","b"]'`).
   * Оптимизировано для передачи через IPC без лишней сериализации в JS.
   *
   * @returns JSON-строка со списком всех значений.
   */
  public readAllAsJSON(): string {
    return this.selectAllJsonStmt.get() ?? "[]";
  }

  /**
   * Возвращает общее количество записей в таблице без фильтрации.
   *
   * @returns Число строк в таблице.
   */
  public count(): number {
    return this.countStmt.get() ?? 0;
  }

  /**
   * Фильтрует переданный массив, оставляя только те значения, которые присутствуют в таблице БД.
   *
   * @param values Массив проверяемых значений.
   * @returns Подмножество переданного массива, найденное в базе данных.
   */
  public filterExisting(values: readonly T[]): T[] {
    if (values.length === 0) return [];
    return this.filterExistingStmt.all(JSON.stringify(values));
  }
}
