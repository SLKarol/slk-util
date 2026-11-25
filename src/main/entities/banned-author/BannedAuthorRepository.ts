import { SingleColumnTable } from "@main/shared/db";

/**
 * Репозиторий для управления списком заблокированных авторов (таблица `banned_authors`).
 */
class BannedAuthorRepository {
  private readonly table = new SingleColumnTable<string>(
    "banned_authors",
    "login",
  );

  /**
   * Добавляет логин автора в черный список.
   *
   * @param login Логин автора на stihi.ru.
   * @returns `true`, если автор добавлен; `false`, если логин пустой или уже в бане.
   */
  public add(login: string): boolean {
    const normalized = login.trim();
    if (!normalized) return false;
    return this.table.add(normalized);
  }

  /**
   * Массово добавляет логины авторов в черный список одной транзакцией.
   *
   * @param logins Массив логинов авторов.
   * @returns Количество новых добавленных авторов.
   */
  public addMany(logins: readonly string[]): number {
    const normalized = logins
      .map((login) => login.trim())
      .filter((login) => login.length > 0);
    return this.table.addMany(normalized);
  }

  /**
   * Удаляет автора из черного списка.
   *
   * @param login Логин автора.
   * @returns `true`, если автор был в списке и удален.
   */
  public remove(login: string): boolean {
    return this.table.remove(login.trim());
  }

  /**
   * Возвращает полный список заблокированных авторов.
   *
   * @returns Массив логинов.
   */
  public getAll(): string[] {
    return this.table.readAll();
  }

  /**
   * Возвращает полный список заблокированных авторов в виде JSON-строки.
   *
   * @returns JSON-строка массива логинов.
   */
  public getAllAsJSON(): string {
    return this.table.readAllAsJSON();
  }

  /**
   * Возвращает общее количество заблокированных авторов в базе.
   *
   * @returns Количество записей в таблице `banned_authors`.
   */
  public getCount(): number {
    return this.table.count();
  }

  /**
   * Принимает массив логинов (например, авторов со страницы) и возвращает только тех из них,
   * кто находится в черном списке.
   *
   * @param logins Массив логинов для проверки.
   * @returns Массив логинов из переданного списка, которые есть в БД.
   */
  public filterBanned(logins: readonly string[]): string[] {
    if (logins.length === 0) return [];
    const normalized = logins
      .map((login) => login.trim())
      .filter((login) => login.length > 0);
    return this.table.filterExisting(normalized);
  }
}

export const bannedAuthorRepository = new BannedAuthorRepository();
