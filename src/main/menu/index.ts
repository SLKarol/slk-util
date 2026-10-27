import {
  BrowserWindow,
  Menu,
  type MenuItem,
  type MenuItemConstructorOptions,
} from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import { URL_PATH } from "@shared/lib/urlPath";

/**
 * Создать меню для приложения
 * @param mainWindow процесс главного окна
 */
export const createAppMenu = (mainWindow: BrowserWindow | null) => {
  const menuTemplate = [
    {
      label: "Страница",
      submenu: [
        {
          label: "Главная",
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send(CHANNELS.NAVIGATE, "/");
            }
          },
        },
        {
          label: URL_PATH.stihiru.label,
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send(
                CHANNELS.NAVIGATE,
                URL_PATH.stihiru.url,
              );
            }
          },
        },
        {
          label: URL_PATH.wireguardtunnel.label,
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send(
                CHANNELS.NAVIGATE,
                URL_PATH.wireguardtunnel.url,
              );
            }
          },
        },
        { type: "separator" }, // Горизонтальная черта (не на macOS)
        { role: "quit", label: "Выход", accelerator: "Ctrl+q" }, // Пункт «Выход» (не на macOS)
      ],
    },
    {
      label: "Настройка",
      submenu: [
        {
          label: URL_PATH.settings.label,
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send(
                CHANNELS.NAVIGATE,
                URL_PATH.settings.url,
              );
            }
          },
        },
      ],
    },
    {
      label: "Рассылка",
      submenu: [
        {
          label: URL_PATH.yaplakal.label,
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send(
                CHANNELS.NAVIGATE,
                URL_PATH.yaplakal.url,
              );
            }
          },
        },
        {
          label: URL_PATH.reddit.label,
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send(
                CHANNELS.NAVIGATE,
                URL_PATH.reddit.url,
              );
            }
          },
        },
      ],
    },
  ] as (MenuItemConstructorOptions | MenuItem)[];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
};
