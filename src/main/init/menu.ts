import {
  BrowserWindow,
  Menu,
  type MenuItem,
  type MenuItemConstructorOptions,
} from "electron";

import { CHANNELS } from "@shared/ipc/channels";

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
          label: "Stihi.Ru",
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send(CHANNELS.NAVIGATE, "/stihiru");
            }
          },
        },
        {
          label: "Настройки тунеля для WireGuard",
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send(
                CHANNELS.NAVIGATE,
                "/wireguardtunnel",
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
          label: "TG-bot",
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send(CHANNELS.NAVIGATE, "/settingstgbot");
            }
          },
        },
        {
          label: "Загрузки",
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send(
                CHANNELS.NAVIGATE,
                "/settingsDownloads",
              );
            }
          },
        },
        {
          label: "Каталог хранения временных файлов",
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send(CHANNELS.NAVIGATE, "/cacheDir");
            }
          },
        },
      ],
    },
    {
      label: "Рассылка",
      submenu: [
        {
          label: "ЯПлакал",
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send(
                CHANNELS.NAVIGATE,
                "/yaplakal/select",
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
