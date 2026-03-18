import {
  Menu,
  BrowserWindow,
  type MenuItemConstructorOptions,
  type MenuItem,
} from "electron";

import { CHANNELS } from "@shared/ipc/channels";

export const createAppMenu = (mainWindow: BrowserWindow | null) => {
  const menuTemplate = [
    {
      label: "Навигация",
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
          label: "Stihi.Ru",
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send(CHANNELS.NAVIGATE, "/stihiru");
            }
          },
        },
        {
          label: "О программе",
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send(CHANNELS.NAVIGATE, "/about");
            }
          },
        },
        { type: "separator" }, // Горизонтальная черта (не на macOS)
        { role: "quit", label: "Выход", accelerator: "Ctrl+q" }, // Пункт «Выход» (не на macOS)
      ],
    },
  ] as (MenuItemConstructorOptions | MenuItem)[];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
};
