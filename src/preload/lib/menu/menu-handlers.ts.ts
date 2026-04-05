import { ipcRenderer, type IpcRendererEvent } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import { type ElectronAPI } from "@shared/lib/types/electron-api";

/**
 * Создаёт объект с обработчиками событий меню.
 */
export const createMenuHandlers = () =>
  ({
    /**
     * Подписывается на событие выбора пункта меню.
     *
     * Вызывает переданный колбэк при получении события `NAVIGATE` из главного процесса.
     * Первый аргумент из события (значение выбранного пункта) передаётся в колбэк.
     *
     * @param callback - Функция, вызываемая при выборе пункта меню. Принимает строковое значение.
     * @returns Функция отписки от события.
     */
    onSelectMenu: (callback: (value: string) => void) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (event: IpcRendererEvent, ...args: string[]) =>
        callback(args[0]);

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.NAVIGATE, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(CHANNELS.NAVIGATE, subscription);
      };
    },
  }) as ElectronAPI;
