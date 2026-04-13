import { type IpcMainEvent } from "electron";

import { StartTunnelSettingsPayload } from "@shared/lib/types/electron-api";
import { type IPRange } from "@shared/lib/types/tunnel";

/**
 * Данные, передаваемые при создании WireGuard-туннеля через IPC.
 *
 * Содержит информацию о событии Electron IPC и настройках туннеля.
 */
export interface CreateTunnelPayload {
  /**
   * Объект события из модуля `ipcMain` Electron.
   *
   * Используется для отправки ответов обратно в renderer-процесс.
   */
  ipcMainEvent: IpcMainEvent;

  settingsWireGuardTunnel: StartTunnelSettingsPayload;
}

/**
 * Статус ответа от RIPEstat API.
 */
export type RIPEStatus = "ok" | "error" | "maintenance";

/**
 * Статус вызова данных в RIPEstat API.
 */
export type DataCallStatus = "supported" | "deprecated" | "development";

// === Временные метки ===

/**
 * Временная метка для анонсирования префикса.
 */
export interface Timeline {
  /**
   * Время начала анонсирования префикса в формате ISO8601.
   */
  starttime: string;

  /**
   * Время окончания анонсирования префикса в формате ISO8601. Null означает, что префикс всё ещё анонсируется.
   */
  endtime: string | null;
}

// === Префикс ===

/**
 * Информация об анонсированном сетевом префиксе.
 */
export interface AnnouncedPrefix {
  /**
   * Сетевой префикс в формате CIDR (например, "8.8.8.0/24" или "2001:4860::/32").
   */
  prefix: string;

  /**
   * Массив временных меток, показывающих периоды анонсирования префикса.
   */
  timelines: Timeline[];
}

// === Секция data ===

/**
 * Данные ответа от RIPEstat API для анонсированных префиксов.
 */
export interface AnnouncedPrefixesData {
  /**
   * Время начала запроса в формате ISO8601.
   */
  query_starttime: string;

  /**
   * Время окончания запроса в формате ISO8601.
   */
  query_endtime: string;

  /**
   * Ресурс, для которого запрашивались префиксы (например, "AS15169").
   */
  resource: string;

  /**
   * Массив анонсированных префиксов.
   */
  prefixes: AnnouncedPrefix[];
}

// === Полный ответ API ===

/**
 * Полный ответ от RIPEstat API для запроса announced-prefixes.
 */
export interface RIPEstatAnnouncedPrefixesResponse {
  /**
   * Общий статус ответа.
   */
  status: RIPEStatus;

  /**
   * HTTP-код статуса.
   */
  status_code: number;

  /**
   * Статус вызова данных.
   */
  data_call_status: DataCallStatus;

  /**
   * Название вызова данных (всегда "announced-prefixes").
   */
  data_call_name: "announced-prefixes";

  /**
   * Версия API (например, "1.2").
   */
  version: string;

  /**
   * Флаг, указывающий, были ли данные взяты из кэша.
   */
  cached: boolean;

  /**
   * Время обработки запроса в миллисекундах (как строка).
   */
  process_time: string;

  /**
   * Массив сообщений об ошибках или предупреждениях (опционально).
   */
  messages?: string[];

  /**
   * Основные данные ответа.
   */
  data: AnnouncedPrefixesData;
}

export interface CalculateExcludedCidrsPayload {
  /**
   * Объект с разделёнными IPv4 и IPv6 префиксами доменов.
   */
  prefixesForDomainsSeparate: IPRange;
  /**
   *  Массив локальных сетей (CIDR)
   */
  localNetworks: string[];
}
