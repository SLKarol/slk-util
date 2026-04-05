import {
  menuAPI,
  messagesAPI,
  requestsAPI,
  settingsAPI,
  stihiRuAPI,
} from "@preload/handlers";
import { contextBridge } from "electron";

import { type ElectronAPI } from "@shared/lib/types/electron-api";

/**
 * Экспонирование интерфейса `electronAPI` в контекст рендер-процесса.
 * 
 * Используется `contextBridge.exposeInMainWorld` для безопасного доступа к методам главного процесса.
 * Все API объединяются в один объект и приводятся к типу `ElectronAPI`, определённому в общих типах.

* @remarks
 * Этот механизм защищает рендер-процесс от прямого доступа к `remote` модулям Electron,
 * что повышает безопасность приложения.
 */
contextBridge.exposeInMainWorld("electronAPI", {
  ...menuAPI,
  ...messagesAPI,
  ...requestsAPI,
  ...settingsAPI,
  ...stihiRuAPI,
} as ElectronAPI);
