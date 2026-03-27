import { type IpcMainEvent } from "electron";

import { REQUEST_HEADERS } from "@main/shared/lib/constants";

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
    event: IpcMainEvent,
    requestParam: string,
  ) => {
    try {
      const response = await fetch(requestParam, {
        method: "GET",
        headers: REQUEST_HEADERS,
      });
      // Получаем сырые данные
      const arrayBuffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Определяем кодировку (сначала пробуем из заголовка, затем автоопределение)
      let charset = "utf-8";
      const contentType = response.headers.get("content-type") || "";
      const charsetMatch = contentType.match(/charset=([^;,\s"]+)/i);
      if (charsetMatch) {
        charset = charsetMatch[1].toLowerCase();
      }

      // Декодируем с правильной кодировкой
      const decoder = new TextDecoder(charset);
      const htmlText = decoder.decode(uint8Array);

      // Устанавливаем корректные заголовки для клиента
      event.reply(CHANNELS.RECEIVE_TEXT, {
        requestParam,
        textContent: htmlText,
      });
    } catch (error) {
      event.reply(CHANNELS.ERROR_MAIN, {
        requestParam,
        error,
      });
    }
  },
};
