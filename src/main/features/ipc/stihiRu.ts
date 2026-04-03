import { exec } from "child_process";
import { type IpcMainEvent, shell } from "electron";

import { BASE_URL_STIHI_RU } from "../lib/constants";

import { CHANNELS } from "@shared/ipc/channels";
import { wait } from "@shared/lib/helpers/wait";

/**
 * Объект, содержащий обработчики IPC-каналов для взаимодействия с сайтом "Стихи.ру".
 *
 * Каждый обработчик соответствует определённому каналу и выполняет действие,
 * связанное с открытием внешних ссылок на сайте "Стихи.ру" через системный браузер.
 */
export const stihiRuHandlers = {
  /**
   * Открывает в системном браузере страницу стихотворения на сайте "Стихи.ру".
   *
   * @param event - Событие IPC, передаваемое Electron. Не используется напрямую.
   * @param hrefPoem - Относительный путь к стихотворению (например, `/poems/12345`).
   */
  [CHANNELS.STIHI_OPEN_POEM]: (event: IpcMainEvent, hrefPoem: string) => {
    shell.openExternal(`${BASE_URL_STIHI_RU}${hrefPoem}`);
  },
  /**
   * Асинхронно открывает в системном браузере несколько стихотворений по заданным ссылкам.
   *
   * Открытие происходит последовательно: следующее стихотворение открывается только
   * после завершения открытия предыдущего. Это необходимо для соблюдения ограничений
   * безопасности и предотвращения спама запросов.
   *
   * @param _ - Событие IPC. Не используется.
   * @param hrefPoems - Массив относительных путей к стихотворениям.
   */
  [CHANNELS.STIHI_OPEN_ALL_POEMS]: async (
    _: IpcMainEvent,
    hrefPoems: string[],
  ) => {
    for (const link of hrefPoems) {
      // await гарантирует, что следующий шаг цикла начнется
      // только после разрешения текущего промиса
      await shell.openExternal(`${BASE_URL_STIHI_RU}${link}`);
      wait();
    }
  },

  /**
   * Открывает в системном браузере страницу автора на сайте "Стихи.ру" по его ID.
   *
   * @param _ - Событие IPC. Не используется.
   * @param authorId - Идентификатор автора на сайте (например, `pushkin`).
   */
  [CHANNELS.STIHI_OPEN_AUTHOR]: (_: IpcMainEvent, authorId: string) => {
    shell.openExternal(`${BASE_URL_STIHI_RU}/avtor/${authorId}`);
  },

  /**
   * Проверка, есть ли в запущенных процессах указанная программа.
   * @param ipcMainEvent - главный процесс
   * @param browserProgram - программа, которую нужно проверить
   */
  [CHANNELS.CHECK_BROWSER_PROGRAM_RUN]: (
    ipcMainEvent: IpcMainEvent,
    browserProgram: string,
  ) => {
    // chcp 65001 - устанавливает кодовую страницу UTF-8 для командной строки
    exec(`chcp 65001 && taskkill /im ${browserProgram} /f`, (error, stdout) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        ipcMainEvent.reply(CHANNELS.SEND_POP_UP_ERROR, error.message);
        return;
      }
      if (stdout) {
        ipcMainEvent.reply(
          CHANNELS.SEND_POP_UP_MESSAGE,
          `Процесс ${browserProgram} найден: ${stdout}`,
        );
      }
    });
  },
};
