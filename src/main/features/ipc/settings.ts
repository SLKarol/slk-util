import { type IpcMainEvent } from "electron";

import { UserDataFileManager } from "../UserDataFileManager";

import { CHANNELS } from "@shared/ipc/channels";
import { type AppSettings } from "@shared/lib/types/app-settings";

import { type WriteSettingsProps } from "./settings.type";

const settingsFile = new UserDataFileManager<AppSettings>("settings.json", {
  stihiRu: { login: "", password: "", cookies: [] },
  browserProcessName: "",
});

/**
 * Объект, содержащий обработчики IPC-запросов для работы с настройками приложения.
 *
 * @remarks
 * Данный объект предоставляет методы для чтения настроек приложения по запросу из renderer-процесса.
 * Все операции асинхронные и используют механизм IPC для обмена данными между процессами.
 * При возникновении ошибок отправляется соответствующее сообщение через канал `ERROR_MAIN`.
 */
export const settingsHandlers = {
  /**
   * Обрабатывает IPC-запрос на получение текущих настроек приложения.
   *
   * @param event - Объект события IPC, используемый для отправки ответа обратно в renderer.
   * @param requestParam - Строка-идентификатор запроса (не используется напрямую, но передаётся в ошибку).
   *
   * @throws Отправляет сообщение об ошибке через канал `ERROR_MAIN` в случае неудачного чтения файла.
   */
  [CHANNELS.GET_SETTINGS]: async (
    ipcMainEvent: IpcMainEvent,
    requestParam: string,
  ) => {
    try {
      const settingsData = await settingsFile.readData();
      ipcMainEvent.reply(CHANNELS.RECEIVE_SETTINGS, settingsData);
    } catch (error) {
      console.error("Error:", error);
      ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
        requestParam,
        error,
      });
    }
  },

  [CHANNELS.SAVE_SETTING]: async (
    ipcMainEvent: IpcMainEvent,
    { key, settings }: WriteSettingsProps,
  ) => {
    try {
      const settingsData = await settingsFile.readData();
      const newSettings = { ...settingsData, [key]: settings };
      await settingsFile.writeData(newSettings);
      ipcMainEvent.reply(CHANNELS.SEND_POP_UP_MESSAGE, "Сохранено");
    } catch (error) {
      console.error("Error:", error);
      ipcMainEvent.reply(CHANNELS.SEND_POP_UP_ERROR, "Ошибка при сохранении");
    }
  },
};
