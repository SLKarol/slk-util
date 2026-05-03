import { ipcRenderer } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import { type ElectronAPI } from "@shared/lib/types/electron-api";

/**
 * Создаёт объект с обработчиками событий для работы с медиа-файлами.
 */
export const createMediaHandlers = () =>
  ({
    saveMediaFile: (payload) =>
      ipcRenderer.send(CHANNELS.SAVE_MEDIA_FILE, payload),
    openUrlInBrowser: (url) =>
      ipcRenderer.send(CHANNELS.OPEN_URL_IN_BROWSER, url),
  }) as ElectronAPI;
