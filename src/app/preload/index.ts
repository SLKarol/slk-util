import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import {
  type ElectronAPI,
  type ReceiveText,
} from "@shared/lib/types/electron-api";
import { type RequestLoginForm } from "@shared/lib/types/request";

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

  /**
   * Отправляет запрос на получение настроек через IPC-канал.
   *
   * Данная функция инициирует отправку сообщения главному процессу Electron
   * с просьбой вернуть текущие настройки приложения.
   */
  fetchSettings: () => {
    ipcRenderer.send(CHANNELS.GET_SETTINGS);
  },

  /**
   * Подписывается на событие получения настроек из главного процесса.
   *
   * Устанавливает обработчик для события, которое срабатывает,
   * когда главный процесс возвращает настройки. Возвращает функцию отписки,
   * которую можно вызвать для прекращения прослушивания события.
   *
   * @param {Function} callback - Функция обратного вызова, вызываемая при получении настроек.
   * @param {unknown} callback.settings - Полученные настройки (может быть любым типом).
   * @returns {Function} Функция, при вызове которой происходит отписка от события.
   */
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

  /**
   * Отправляет данные формы входа на сервер через IPC.
   *
   * Передаёт данные аутентификации (например, логин и пароль) в главный процесс
   * для последующей отправки на сервер.
   *
   */
  fetchLogin: (data: RequestLoginForm) => {
    ipcRenderer.send(CHANNELS.REQUEST_POST_LOGIN, data);
  },

  /**
   * Отправляет запрос через IPC-канал на получение списка забаненных авторов.
   */
  fetchBanAuthors: () => {
    ipcRenderer.send(CHANNELS.GET_BAN_AUTHORS);
  },

  /**
   * Подписка на событие получения списка забаненных авторов.
   * @param callback - Функция обратного вызова, вызываемая при получении настроек
   * @returns {Function} Функция, при вызове которой происходит отписка от события.
   */
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
} as ElectronAPI);
