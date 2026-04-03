import { type IpcMainEvent } from "electron";

import {
  readSettingsFile,
  writeSettings,
  WriteSettingsProps,
} from "../lib/settings";

import { CHANNELS } from "@shared/ipc/channels";

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
   * @remarks
   * Функция асинхронно считывает файл настроек с помощью `readSettingsFile`. В случае успеха отправляет
   * данные настроек через канал `RECEIVE_SETTINGS`. Если произошла ошибка — логирует её и отправляет
   * информацию об ошибке в renderer-процесс.
   *
   * @throws Отправляет сообщение об ошибке через канал `ERROR_MAIN` в случае неудачного чтения файла.
   */
  [CHANNELS.GET_SETTINGS]: async (
    ipcMainEvent: IpcMainEvent,
    requestParam: string,
  ) => {
    try {
      const settingsData = await readSettingsFile();
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
    saveSettingPayload: WriteSettingsProps,
  ) => {
    try {
      writeSettings(saveSettingPayload);
      ipcMainEvent.reply(CHANNELS.SEND_POP_UP_MESSAGE, "Сохранено");
    } catch (error) {
      console.error("Error:", error);
      ipcMainEvent.reply(CHANNELS.SEND_POP_UP_ERROR, "Ошибка при сохранении");
    }
  },
};
