/**
 * Заголовки запросов. Прикинуться браузером.
 */
export const REQUEST_HEADERS = {
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "same-origin", // Было "none"
  "Sec-Fetch-User": "?1",
  "Sec-GPC": "1",
  "Upgrade-Insecure-Requests": "1",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0",
  DNT: "1",
  Priority: "u=0, i",
} as Record<string, string>;

/**
 * Дефолтная настройка для WireGuard Tunnel.
 */
const SETTINGS_WIRE_GUARD_TUNNEL = {
  allowedIPs: "",
  excludeFromVpn: [] as string[],
  siteInfoDnsServers: [] as string[],
  localNetworks: [] as string[],
  onlyThisDomains: [] as string[],
};

/**
 * Дефолтная настройка для Telegram.
 */
const SETTINGS_TELEGRAM = {
  telegramToken: "",
  telegramAdmin: "",
  telegramGroups: [] as string[],
  waitSeconds: 4,
};

/**
 * Дефолтные настройки приложения.
 */
export const SETTINGS_APP = {
  stihiRu: { login: "", password: "", cookies: [] as string[] },
  browserProcessName: "",
  wireGuardTunnel: SETTINGS_WIRE_GUARD_TUNNEL,
  telegram: SETTINGS_TELEGRAM,
  cacheDir: "",
  selectorMediaYap:
    "div[rel='yapfiles'], div#player video, iframe:not(#vkwidget1), a.basic-img.attach, div.attach>img",
  reddit: {
    redditUserName: "",
    redditPassword: "",
    redditAppId: "",
    redditApiSecret: "",
    redditLimitRecords: 12,
  },
  templateHoliday: "",
  ollama: {
    host: "",
    model: {
      holiday: "",
    },
  },

  templatesPrompts: {
    holiday: "",
  },
};
