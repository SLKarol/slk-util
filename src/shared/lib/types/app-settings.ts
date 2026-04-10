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
   * Список IP адресов, которые разрешены для подключения через VPN.
   */
  allowedIPs: string;
}
