import { ipcRenderer } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import { type ElectronAPI } from "@shared/lib/types/electron-api";

/**
 * Создаёт объект с обработчиками событий для работы с YaP
 */
export const createYaPlakalHandlers = () =>
  ({
    fetchYaPlakalTopic: (url) => {
      ipcRenderer.send(CHANNELS.FETCH_YA_PLAKAL_TOPIC, url);
    },
  }) as ElectronAPI;
