import { type IpcMainEvent, net } from "electron";
import { existsSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";

import { getDefaultSettings } from "../lib/helpers";
import { fetchHtml } from "../lib/helpers/fetch";
import { UserDataFileManager } from "../UserDataFileManager";

import { CHANNELS } from "@shared/ipc/channels";
import { type AppSettings } from "@shared/lib/types/app-settings";
import { type DownloadFileProps } from "@shared/lib/types/electron-api";

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

  [CHANNELS.DOWNLOAD_FILE]: async (
    ipcMainEvent: IpcMainEvent,
    { name, url }: DownloadFileProps,
  ) => {
    const settingsFile = new UserDataFileManager<AppSettings>(
      "settings.json",
      getDefaultSettings(),
    );
    const settingsData = await settingsFile.readData();
    const { folderForSaveFiles } = settingsData;

    try {
      const fileResponse = await net.fetch(url);
      if (!fileResponse.ok) {
        ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
          requestParam: CHANNELS.DOWNLOAD_FILE,
          error: new Error(
            `Ошибка сети: ${fileResponse.status} ${fileResponse.statusText}`,
          ),
        });
      }

      // Получаем данные файла в виде буфера
      const fileBuffer = await fileResponse.arrayBuffer();
      // 1. Определяем расширение
      const parsed = new URL(url);
      const pathname = parsed.pathname;
      let ext = path.extname(pathname); // Пробуем взять из URL
      if (!ext) {
        const contentType = fileResponse.headers.get("content-type") || "";
        switch (contentType) {
          case "image/jpeg":
            ext = ".jpg";
            break;
          case "image/png":
            ext = ".png";
            break;
          case "application/pdf":
            ext = ".pdf";
            break;
          case "text/plain":
            ext = ".txt";
            break;
          default:
            ext = ".bin"; // Стандартное расширение
        }
      }

      // 2. Формируем базовое имя файла
      let fileName = name + ext;
      let filePath = path.join(folderForSaveFiles, fileName);

      // 3. Проверяем существование и добавляем индекс при необходимости
      let counter = 1;
      while (existsSync(filePath)) {
        fileName = `${name}_${counter}${ext}`;
        filePath = path.join(folderForSaveFiles, fileName);
        counter++;
      }

      await writeFile(filePath, Buffer.from(fileBuffer));
      ipcMainEvent.reply(CHANNELS.SEND_POP_UP_MESSAGE, "Файл сохранён");
    } catch (error) {
      console.error("DOWNLOAD_FILE with error:", error);
      ipcMainEvent.reply(CHANNELS.ERROR_MAIN, {
        requestParam: CHANNELS.SAVE_BANS_AS_UBLOCK,
        error,
      });
    }
  },
};
