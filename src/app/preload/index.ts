import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

import { CHANNELS } from "@shared/ipc/channels";

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

  // Более расширенный пример:
  // onMessage: (
  //   channel: string,
  //   callback: (event: Electron.IpcRendererEvent, data: unknown) => void,
  // ) => {
  //   const subscription = (
  //     event: Electron.IpcRendererEvent,
  //     ...args: unknown[]
  //   ) => callback(event, args[0]);
  //   ipcRenderer.on(channel, subscription);
  //   return () => {
  //     ipcRenderer.removeListener(channel, subscription);
  //   };
  // },
});

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
