import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import { type ReceiveText } from "@shared/lib/types/electron-api";

contextBridge.exposeInMainWorld("electronAPI", {
  /**
   * Обработчик события выбора меню
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

  /**
   * Запрос текста по URL
   * @param url - URL для запроса
   */
  fetchText: (url: string) => {
    ipcRenderer.send(CHANNELS.REQUEST_TEXT, url);
  },

  /**
   * Обработчик события получения текста
   */
  onReceiveText: (callback: (receiveData: ReceiveText) => void) => {
    // Создаём функцию‑обёртку для подписки
    const subscription = (event: IpcRendererEvent, ...args: unknown[]) =>
      callback(args[0] as ReceiveText);

    // Подписываемся на событие
    ipcRenderer.on(CHANNELS.RECEIVE_TEXT, subscription);

    // Возвращаем функцию отписки
    return () => {
      ipcRenderer.removeListener(CHANNELS.RECEIVE_TEXT, subscription);
    };
  },
});

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
