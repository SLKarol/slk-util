/**
 * Интерфейс, описывающий общие настройки приложения.
 * Они же, эти настройки, хранятся в файле settings.json.
 */
export interface AppSettings {
  /**
   * Настройки, специфичные для сайта stihi.ru.
   */
  stihiRu: AppSettingsStihiRu;

  /**
   * Имя процесса браузера.
   */
  browserProcessName: string;

  /**
   * Настройки WireGuard.
   */
  wireGuardTunnel: AppSettingsWireGuardTunnel;

  /**
   * Настройки Telegram.
   */
  telegram: AppSettingsTelegram;

  /**
   * Каталог для сохранения файлов, загружаемых через приложение.
   * Это может быть полезно для организации и управления загруженными файлами, а также для обеспечения удобного доступа к ним пользователю.
   * Например, пользователь может указать папку "Загрузки" или создать отдельную папку для файлов, связанных с данным приложением.
   * Важно, чтобы приложение имело разрешение на запись в эту папку, иначе сохранение файлов может завершиться с ошибкой.
   */
  folderForSaveFiles: string;

  /**
   * Каталог для кэширования данных.
   */
  cacheDir: string;

  /**
   * Селектор для поиска медиа-файлов на странице ЯП.
   */
  selectorMediaYap: string;

  /**
   * Настройки для интеграции с Reddit.
   */
  reddit: AppSettingsReddit;

  /**
   * Шаблон текста, который будет отправлен в чат Telegram о сегодняшнем празднике.
   */
  templateHoliday: string;

  /**
   * Настройки Ollama. Объект содержит параметры модели и URL сервера
   */
  ollama: AppSettingsOllama;

  /**
   * Настройки шаблонных промтов. Объект содержит параметры для генерации текстов, связанных с праздниками.
   */
  templatesPrompts: TemplatePrompt;
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

export interface AppSettingsWireGuardTunnel {
  /**
   * DNS серверы, которые будут использованы для определения инфы о сайте
   */
  siteInfoDnsServers: string[];

  /**
   * Список доменов, которые не должны быть включены в VPN.
   */
  excludeFromVpn: string[];

  /**
   * Список локальных сетей, которые не должны быть включены в VPN.
   */
  localNetworks: string[];

  /**
   * Список доменов, которые используют vpn.
   * Это для тех случаев, когда нужно, чтобы только определенные домены использовали VPN,
   * а остальные работали напрямую.
   */
  onlyThisDomains: string[];

  /**
   * Список IP адресов, которые разрешены для подключения через VPN.
   */
  allowedIPs: string;
}

/**
 * Настройки Telegram.
 */
export interface AppSettingsTelegram {
  /**
   * Токен телеграм-бота
   */
  telegramToken: string;
  /**
   * ID телеграмм-групп, в которые можно делать рассылку.
   */
  telegramGroups: string[];
  /**
   * ID телеграм-чата бота с админом. Сюда будут записываться картинки для отправки в альбомы.
   */
  telegramAdmin: string;

  /**
   * Время ожидания в секундах между рассылками каналов.
   */
  waitSeconds: number;
}

/**
 * Интерфейс настроек приложения для интеграции с Reddit.
 * Содержит учетные данные и параметры конфигурации для взаимодействия с API Reddit.
 */
export interface AppSettingsReddit {
  /**
   * Имя пользователя в Reddit.
   * Используется для аутентификации при обращении к API.
   */
  redditUserName: string;

  /**
   * Пароль пользователя в Reddit.
   * Используется вместе с именем пользователя для аутентификации.
   */
  redditPassword: string;

  /**
   * Идентификатор приложения (client ID), выданный Reddit при регистрации приложения.
   * Необходим для OAuth-аутентификации.
   */
  redditAppId: string;

  /**
   * Секретный ключ API (client secret), выданный Reddit при регистрации приложения.
   * Используется для безопасной аутентификации сервера.
   */
  redditApiSecret: string;

  /**
   * Количество записей, которое необходимо получить из Reddit.
   * Ограничивает число возвращаемых элементов (например, постов или комментариев) в одном запросе.
   */
  redditLimitRecords: number;
}

export type SettingsReddit = Omit<AppSettingsReddit, "redditLimitRecords">;

/**
 * Интерфейс, представляющий настройки для приложения Ollama.
 */
export interface AppSettingsOllama {
  /**
   * URL-адрес хоста для службы Ollama.
   */
  host: string;

  /**
   * Конфигурация модели, используемой Ollama.
   */
  model: {
    /**
     * Настройка праздника для модели.
     */
    holiday: string;
  };
}

/**
 * Интерфейс, представляющий шаблонный промт.
 */
export interface TemplatePrompt {
  /**
   * Настройка праздника для шаблона.
   */
  holiday: string;
}
