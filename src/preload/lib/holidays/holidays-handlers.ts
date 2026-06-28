import { ipcRenderer, type IpcRendererEvent } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import { type ElectronAPI } from "@shared/lib/types/electron-api";

/**
 * Создаёт объект с обработчиками событий праздников.
 */
export const createHolidaysHandlers = () =>
  ({
    responseNamesOfHolidays: (callback: (names: string[]) => void) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (event: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as string[]);

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.RESPONSE_NAMES_OF_HOLIDAYS, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(
          CHANNELS.RESPONSE_NAMES_OF_HOLIDAYS,
          subscription,
        );
      };
    },
    receiveNamesOfHolidays: () =>
      ipcRenderer.send(CHANNELS.RECEIVE_NAMES_OF_HOLIDAYS),
  }) as ElectronAPI;
