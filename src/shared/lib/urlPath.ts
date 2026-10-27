/**
 * Адрес для перехода на настройки туннеля WireGuard.
 */
interface UrlAddress {
  /** Полный URL адрес страницы */
  url: string;
  /** Название вкладки или ссылки, отображаемое в меню/навигации */
  label: string;
  /** Путь маршрутизации (path) для react-route */
  routePath: string;
}

/**
 * Карта внешних ссылок и путей навигации приложения.
 * Ключи — уникальные идентификаторы страниц.
 */
interface UrlPath {
  [K: string]: UrlAddress;
}

/**
 * Объект-константа со всеми путями внешней навигации.
 * Используется для генерации ссылок и маршрутизации переходов.
 */
export const URL_PATH = Object.freeze({
  wireguardtunnel: {
    routePath: "wireguardtunnel",
    url: "/wireguardtunnel",
    label: "Настройки туннеля для WireGuard",
  },
  stihiru: { routePath: "stihiru", url: "/stihiru", label: "Stihi.Ru" },
  settings: { routePath: "settings", url: "/settings/", label: "Настройка" },
  yaplakal: {
    routePath: "yaplakal",
    url: "/yaplakal/select",
    label: "ЯПлакал",
  },
  reddit: { routePath: "reddit", url: "/reddit/select", label: "Reddit" },
  ollama: { routePath: "ollama", url: "/ollama", label: "Ollama/Модели" },
} as UrlPath);
