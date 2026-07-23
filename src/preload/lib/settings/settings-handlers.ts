import { ipcRenderer, type IpcRendererEvent } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import { type ElectronAPI } from "@shared/lib/types/electron-api";

/**
 * Создаёт объект с обработчиками событий для работы с настройками.
 */
export const createSettingsHandlers = () =>
  ({
    fetchSettings: () => {
      ipcRenderer.send(CHANNELS.GET_SETTINGS);
    },

    onReceiveSetting: (callback: (settings: unknown) => void) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (event: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0]);

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.RECEIVE_SETTINGS, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(CHANNELS.RECEIVE_SETTINGS, subscription);
      };
    },

    checkBrowserProgramRun: (browserProgramName) =>
      ipcRenderer.send(CHANNELS.CHECK_BROWSER_PROGRAM_RUN, browserProgramName),

    saveSetting: (updateSettings) =>
      ipcRenderer.send(CHANNELS.SAVE_SETTING, updateSettings),

    changeSaveVideoDirectory: () =>
      ipcRenderer.send(CHANNELS.CHANGE_SAVE_VIDEO_DIRECTORY),

    changeCacheFolder: () => ipcRenderer.send(CHANNELS.CHANGE_CACHE_FOLDER),

    requestCacheFolderSize: () =>
      ipcRenderer.send(CHANNELS.REQUEST_CACHE_FOLDER_SIZE),

    onReceiveCacheFolderSize: (callback) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (event: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as number);

      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.RECEIVE_CACHE_FOLDER_SIZE, subscription);

      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(
          CHANNELS.RECEIVE_CACHE_FOLDER_SIZE,
          subscription,
        );
      };
    },

    clearCacheFolder: () => ipcRenderer.send(CHANNELS.CLEAR_CACHE_FOLDER),

    copyTextToClipBoard: (textToClipboard) => {
      ipcRenderer.send(CHANNELS.WRITE_TEXT_TO_CLIPBOARD, textToClipboard);
    },
  }) as ElectronAPI;
