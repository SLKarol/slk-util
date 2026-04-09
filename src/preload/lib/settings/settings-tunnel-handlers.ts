import { ipcRenderer } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import { type ElectronAPI } from "@shared/lib/types/electron-api";

/**
 * Создаёт объект с обработчиками событий для работы с настройками туннеля.
 */
export const createSettingsTunnelHandlers = () =>
  ({
    startTunnelSettings: (settings) =>
      ipcRenderer.send(CHANNELS.START_TUNNEL_SETTINGS, settings),
    receiveStopTunnelSettins: (callback) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = () => callback();
      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.RECEIVE_STOP_TUNNEL_SETTINS, subscription);
      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(
          CHANNELS.RECEIVE_STOP_TUNNEL_SETTINS,
          subscription,
        );
      };
    },
  }) as ElectronAPI;
