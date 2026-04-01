import { dialog, type IpcMainEvent } from "electron";
import { writeFile } from "fs/promises";

import { readBanAuthors, writeBanAuthors } from "@main/features/lib/banAuthors";

import { CHANNELS } from "@shared/ipc/channels";
import { type ReceiveOperationAuthor } from "@shared/lib/types/electron-api";

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
      const bannedAuthors = await readBanAuthors();
      event.reply(CHANNELS.RECEIVE_BAN_AUTHORS, bannedAuthors);
    } catch (error) {
      console.error("Error:", error);
      event.reply(CHANNELS.ERROR_MAIN, {
        requestParam: CHANNELS.GET_BAN_AUTHORS,
        error,
      });
    }
  },

  /**
   * Обработчик для добавления автора в список заблокированных.
   */
  [CHANNELS.ADD_BAN_AUTHOR]: async (event: IpcMainEvent, author: string) => {
    try {
      const bannedAuthors = await readBanAuthors();
      bannedAuthors.push(author);
      await writeBanAuthors(bannedAuthors.sort());
      event.reply(CHANNELS.RECEIVE_ON_OPERATION_AUTHOR, {
        add: true,
        author,
      } as ReceiveOperationAuthor);
    } catch (error) {
      console.error("Error:", error);
      event.reply(CHANNELS.ERROR_MAIN, {
        requestParam: CHANNELS.GET_BAN_AUTHORS,
        error,
      });
    }
  },

  /**
   * Обработчик для удаления автора из списка заблокированных.
   */
  [CHANNELS.REMOVE_BAN_AUTHOR]: async (event: IpcMainEvent, author: string) => {
    try {
      const bannedAuthors = await readBanAuthors();
      const setBannedAuthors = new Set(bannedAuthors);
      setBannedAuthors.delete(author);
      await writeBanAuthors(Array.from(setBannedAuthors).sort());
      event.reply(CHANNELS.RECEIVE_ON_OPERATION_AUTHOR, {
        add: false,
        author,
      } as ReceiveOperationAuthor);
    } catch (error) {
      console.error("Error:", error);
      event.reply(CHANNELS.ERROR_MAIN, {
        requestParam: CHANNELS.GET_BAN_AUTHORS,
        error,
      });
    }
  },

  /**
   * Обработчик для сохранения списка заблокированных авторов в файл для uBlock.
   */
  [CHANNELS.SAVE_BANS_AS_UBLOCK]: async (ipcMainEvent: IpcMainEvent) => {
    const result = await dialog.showSaveDialog({
      title: "Сохранить набор фильтров",
      defaultPath: "filters.txt",
      filters: [
        { name: "Текстовые файлы", extensions: ["txt"] },
        { name: "Все файлы", extensions: ["*"] },
      ],
    });
    // Проверяем, не отменил ли пользователь выбор
    if (result.canceled) {
      return false;
    }
    try {
      const bannedAuthors = await readBanAuthors();
      const newArray = bannedAuthors.map(
        (author) => `##li:has(a[href="/avtor/${author}"])`,
      );
      await writeFile(result.filePath, newArray.join("\n"), "utf-8");
      ipcMainEvent.reply(CHANNELS.SEND_POP_UP_MESSAGE, "Файл сохранён");
    } catch (error) {
      console.error("Error:", error);
      ipcMainEvent.reply(CHANNELS.SEND_POP_UP_ERROR, "Файл не сохранён");
      ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
        requestParam: CHANNELS.SAVE_BANS_AS_UBLOCK,
        error,
      });
    }
  },
};
