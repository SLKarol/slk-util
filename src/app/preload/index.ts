import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import {
  type ElectronAPI,
  type ReceiveText,
} from "@shared/lib/types/electron-api";

contextBridge.exposeInMainWorld("electronAPI", {
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

  fetchText: (url: string) => {
    ipcRenderer.send(CHANNELS.REQUEST_TEXT, url);
  },

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

  fetchBanAuthors: () => {
    ipcRenderer.send(CHANNELS.GET_BAN_AUTHORS);
  },

  onReceiveBanAuthors: (callback) => {
    // Создаём функцию‑обёртку для подписки
    const subscription = (event: IpcRendererEvent, ...args: unknown[]) =>
      callback(args[0] as string[]);

    // Подписываемся на событие
    ipcRenderer.on(CHANNELS.RECEIVE_BAN_AUTHORS, subscription);

    // Возвращаем функцию отписки
    return () => {
      ipcRenderer.removeListener(CHANNELS.RECEIVE_BAN_AUTHORS, subscription);
    };
  },

  stihiOpenPoem: (hrefPoem) =>
    ipcRenderer.send(CHANNELS.STIHI_OPEN_POEM, hrefPoem),
  stihiOpenAllPoems: (hrefPoems) =>
    ipcRenderer.send(CHANNELS.STIHI_OPEN_ALL_POEMS, hrefPoems),
} as ElectronAPI);
