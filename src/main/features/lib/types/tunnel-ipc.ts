import { type IpcMainEvent } from "electron";

import { type AppSettingsWireGuardTunnel } from "@shared/lib/types/app-settings";

/**
 * Данные, передаваемые при создании WireGuard-туннеля через IPC.
 *
 * Содержит информацию о событии Electron IPC и настройках туннеля.
 */
export interface CreateTunnelPayload {
  /**
   * Объект события из модуля `ipcMain` Electron.
   *
   * Используется для отправки ответов обратно в renderer-процесс.
   */
  ipcMainEvent: IpcMainEvent;

  /**
   * Настройки WireGuard-туннеля, полученные из глобальных настроек приложения.
   *
   * Включает параметры, такие как приватный ключ, порт, DNS и разрешённые IP-диапазоны.
   */
  settingsWireGuardTunnel: AppSettingsWireGuardTunnel;
}
