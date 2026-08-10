/** Ключ настроек tg-бота */
export const SETTINGS_TD_BOT = "tgbot";

/** Ключ настроек папки сохранения */
export const SETTINGS_DOWNLOADS = "downloads";

/** Ключ настроек папки кэша */
export const SETTINGS_CACHE = "cache";

/** Ключ настроек селектора ЯП */
export const SETTINGS_SELECTOR_YAP = "selectorYap";

/** Ключ настроек redddit */
export const SETTINGS_REDDIT = "reddit";

/** Ключ настроек шаблона поздравления */
export const SETTINGS_TEMPLATE_HOLIDAY = "templateHoliday";

/** Ключ настроек подключения к ollama*/
export const SETTINGS_OLLAMA = "ollama";

/** Ключ настроек промптов*/
export const SETTINGS_PROMPT = "prompt";

/** Меню "Настройка" */
export const SETTINGS_MENU = [
  { link: SETTINGS_TD_BOT, label: "TG-bot" },
  { link: SETTINGS_DOWNLOADS, label: "Загрузки" },
  { link: SETTINGS_CACHE, label: "Кэш-каталог" },
  { link: SETTINGS_SELECTOR_YAP, label: "CSS-selector для ЯП" },
  { link: SETTINGS_REDDIT, label: "Reddit" },
  { link: SETTINGS_TEMPLATE_HOLIDAY, label: "Шаблон поздравления" },
  { link: SETTINGS_OLLAMA, label: "Настройки подключения к ollama" },
  { link: SETTINGS_PROMPT, label: "Настройки промптов" },
];
