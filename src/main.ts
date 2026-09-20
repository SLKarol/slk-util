import { app, BrowserWindow, session } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import {
  installExtension,
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import windowStateKeeper, { State } from "electron-window-state";

import { createAppMenu } from "./main/menu";
import { registerHandlers } from "@main/features/handlers";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const isDevelopment =
  process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";

const createWindow = (windowState: State) => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
    },
  });
  windowState.manage(mainWindow);

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  createAppMenu(mainWindow);

  // Open the DevTools.
  if (isDevelopment) mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800,
  });

  createWindow(mainWindowState);
  //! Регистрируем обработчики после создания окна
  registerHandlers();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    const mainWindowState = windowStateKeeper({
      defaultWidth: 1000,
      defaultHeight: 800,
    });
    createWindow(mainWindowState);
  }
});

app.whenReady().then(() => {
  if (isDevelopment)
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((ext) => console.log(`Added Extension:  ${ext.name}`))
      .catch((err) => console.log("An error occurred: ", err));

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const isDev = !app.isPackaged;

    const csp = isDev
      ? "default-src 'self'; " +
        "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' https: data:; " +
        "media-src https: blob: data:; " +
        "connect-src 'self' ws: http: https:;"
      : "default-src 'self'; " +
        "script-src 'self'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' https: data:; " +
        "media-src https: blob: data:; " +
        "connect-src 'self' https:;";

    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [csp],
      },
    });
  });

  // session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  //   callback({
  //     responseHeaders: {
  //       ...details.responseHeaders,
  //       "Content-Security-Policy": [
  //         // Dev version
  //         "default-src 'self'; " +
  //           "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
  //           "style-src 'self' 'unsafe-inline'; " +
  //           "img-src 'self' https: data:; " +
  //           "media-src https: data: blob:; " +
  //           "connect-src 'self' ws: http: https:;",
  //         // Prod version
  //         // "default-src 'self'; " +
  //         //   "script-src 'self'; " +
  //         //   "style-src 'self' 'unsafe-inline'; " +
  //         //   "img-src 'self' https: data:; " +
  //         //   "media-src https: blob: data:; " +
  //         //   "connect-src 'self' https:;",
  //       ],
  //     },
  //   });
  // });
});
