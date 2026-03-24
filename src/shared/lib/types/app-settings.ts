/**
 * Интерфейс, описывающий общие настройки приложения.
 */
export interface AppSettings {
  /**
   * Настройки, специфичные для сайта stihi.ru.
   */
  stihiRu: AppSettingsStihiRu;
}

/**
 * Интерфейс, описывающий настройки приложения для работы с сайтом stihi.ru.
 */
export interface AppSettingsStihiRu {
  /**
   * Логин пользователя на сайте stihi.ru.
   */
  login: string;

  /**
   * Пароль пользователя на сайте stihi.ru.
   */
  password: string;

  /**
   * Массив строк, представляющих cookies, используемые для аутентификации на сайте stihi.ru.
   * Хранятся в формате строки cookie (например, "name=value; expires=...").
   */
  cookies: string[];
}
