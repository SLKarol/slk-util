import { type IpcMainEvent } from "electron";

import { readBanAuthors } from "../lib/banAuthors";

import { CHANNELS } from "@shared/ipc/channels";

/**
 * Объект, содержащий обработчики IPC-событий для работы с заблокированными авторами.
 *
 * Каждый ключ соответствует определённому каналу (channel), по которому может быть отправлен запрос
 * из renderer-процесса.
 */
export const banAuthorHandlers = {
  /**
   * Обработчик запроса на получение списка заблокированных авторов.
   *
   * При получении события `GET_BAN_AUTHORS` вызывает функцию `readBanAuthors`,
   * которая читает данные из файла. В случае успеха отправляет результат
   * по каналу `RECEIVE_BAN_AUTHORS`. В случае ошибки — отправляет детали ошибки
   * по каналу `ERROR_MAIN`.
   *
   * @param {IpcMainEvent} event - Объект события IPC, предоставляемый Electron.
   *
   * @emits CHANNELS.RECEIVE_BAN_AUTHORS - Событие с данными заблокированных авторов.
   * @emits CHANNELS.ERROR_MAIN - Событие ошибки, если чтение данных не удалось.
   *
   * @async
   * @throws {Error} Перехватывает и логирует ошибки, отправляя их через IPC.
   */
  [CHANNELS.GET_BAN_AUTHORS]: async (event: IpcMainEvent) => {
    try {
      const settingsData = await readBanAuthors();
      event.reply(CHANNELS.RECEIVE_BAN_AUTHORS, settingsData);
    } catch (error) {
      console.error("Error:", error);
      event.reply(CHANNELS.ERROR_MAIN, {
        requestParam: CHANNELS.GET_BAN_AUTHORS,
        error,
      });
    }
  },
};
