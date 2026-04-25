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
  }) as ElectronAPI;
