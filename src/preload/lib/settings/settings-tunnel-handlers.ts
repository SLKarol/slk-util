import { ipcRenderer, type IpcRendererEvent } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import {
  type ElectronAPI,
  type ReceiveDomainAddressRecord,
  type ReceiveExcludedCidrs,
} from "@shared/lib/types/electron-api";

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
    receiveDomainAddress: (callback) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (_: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as ReceiveDomainAddressRecord);
      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.RECEIVE_DOMAIN_ADDRESS, subscription);
      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(
          CHANNELS.RECEIVE_DOMAIN_ADDRESS,
          subscription,
        );
      };
    },

    receiveExcludedCidrs: (callback) => {
      // Создаём функцию‑обёртку для подписки
      const subscription = (_: IpcRendererEvent, ...args: unknown[]) =>
        callback(args[0] as ReceiveExcludedCidrs);
      // Подписываемся на событие
      ipcRenderer.on(CHANNELS.RECEIVE_EXCLUDED_CIDRS, subscription);
      // Возвращаем функцию отписки
      return () => {
        ipcRenderer.removeListener(
          CHANNELS.RECEIVE_EXCLUDED_CIDRS,
          subscription,
        );
      };
    },
  }) as ElectronAPI;
