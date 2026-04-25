import { type IpcMainEvent } from "electron";

import { fetchHtml } from "../lib/helpers/fetch";

import { CHANNELS } from "@shared/ipc/channels";

/**
 * Объект, содержащий обработчики IPC-запросов для выполнения HTTP-запросов.
 *
 * @remarks
 * Данный объект экспортирует асинхронные обработчики, зарегистрированные на определённые каналы IPC.
 * Обработчики выполняют сетевые запросы, обрабатывают ответы и отправляют результат обратно в renderer-процесс.
 * В случае ошибок — отправляют сообщение об ошибке через соответствующий канал.
 */
export const requestHandlers = {
  /**
   * Обрабатывает IPC-запрос на получение текстового содержимого по указанному URL (GET-запрос).
   *
   * @param event - Объект события IPC, используемый для отправки ответа обратно в renderer.
   * @param requestParam - URL-адрес, с которого необходимо получить данные.
   *
   * @remarks
   * Функция выполняет GET-запрос с предопределёнными заголовками. Автоматически определяет кодировку
   * ответа: сначала из заголовка `Content-Type`, при отсутствии — использует UTF-8 по умолчанию.
   * Декодирует бинарные данные с помощью `TextDecoder` и отправляет текстовый результат через канал `RECEIVE_TEXT`.
   *
   * @throws Отправляет сообщение об ошибке через канал `ERROR_MAIN` в случае неудачного запроса.
   */
  [CHANNELS.REQUEST_TEXT]: async (
    ipcMainEvent: IpcMainEvent,
    requestParam: string,
  ) => {
    try {
      const htmlText = await fetchHtml(requestParam);

      // Устанавливаем корректные заголовки для клиента
      ipcMainEvent.reply(CHANNELS.RECEIVE_TEXT, {
        requestParam,
        textContent: htmlText,
      });
    } catch (error) {
      ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
        requestParam,
        error,
      });
    }
  },
};
