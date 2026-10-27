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
  const menuFromContant = (pageName: string) => ({
    label: URL_PATH[pageName].label,
    click: () => {
      if (mainWindow) {
        mainWindow.webContents.send(CHANNELS.NAVIGATE, URL_PATH[pageName].url);
      }
    },
  });

  const menuTemplate = [
    {
      label: "Страница",
      submenu: ["main", "stihiru", "wireguardtunnel", "separator", "quit"].map(
        (menuName) => {
          if (menuName in URL_PATH) return menuFromContant(menuName);
          if (menuName === "main")
            return {
              label: "Главная",
              click: () => {
                if (mainWindow) {
                  mainWindow.webContents.send(CHANNELS.NAVIGATE, "/");
                }
              },
            };
          if (menuName === "separator") return { type: "separator" }; // Горизонтальная черта (не на macOS)
          if (menuName === "quit")
            return { role: "quit", label: "Выход", accelerator: "Ctrl+q" }; // Пункт «Выход» (не на macOS)

          console.error(`Неизвестный пункт меню: ${menuName}`);
          return null;
        },
      ),
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
      submenu: ["yaplakal", "reddit"].map(menuFromContant),
    },
  ] as (MenuItemConstructorOptions | MenuItem)[];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
};
