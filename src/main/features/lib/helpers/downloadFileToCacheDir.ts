import { net } from "electron";
import fs from "fs";
import { join } from "path";

import { getCacheFileName } from "./getCacheFileName";
import { getFileSize } from "./getFileSize";

/**
 * Интерфейс параметров для функции скачивания файла в кэш.
 */
interface IDownloadFileToCacheDir {
  /**
   * URL файла, который необходимо скачать.
   */
  fileUrl: string;
  /**
   * Полный путь к файлу, куда будет сохранён результат загрузки.
   */
  fullFileName: string;
  /**
   * Необязательная функция обратного вызова для обработки ошибок.
   * Если указана, будет вызвана при возникновении ошибки во время запроса или получения данных.
   *
   * @param error - Объект ошибки типа `Error`.
   */
  handleError?: (error: Error) => void;
}

/**
 * Асинхронно скачивает файл по указанному URL и сохраняет его в локальной файловой системе.
 *
 * Использует модуль `net` из Electron для выполнения HTTP-запроса и потоковую запись в файл
 * через Node.js `fs.createWriteStream`. Поддерживает обработку ошибок на уровне запроса и ответа.
 */
export async function downloadFileToCacheDir({
  fileUrl,
  fullFileName,
  handleError,
}: IDownloadFileToCacheDir) {
  // const base64Content=await decodeImageUrlTo64(fileUrl);

  return new Promise((resolve, reject) => {
    // 1. Создаём запрос
    const request = net.request({
      method: "GET",
      url: fileUrl,
    });

    // 2. Обрабатываем ответ сервера
    request.on("response", (response) => {
      if (response.statusCode !== 200) {
        const error = new Error(
          `Failed to download file. Status code: ${response.statusCode}`,
        );
        handleError?.(error);
        reject(error);
        return;
      }

      // Создаём поток для записи в файл
      const fileStream = fs.createWriteStream(fullFileName);

      // 3. Собираем данные по частям (chunk'ам)
      response.on("data", (chunk) => {
        fileStream.write(chunk);
      });

      // 4. Завершение загрузки
      response.on("end", () => {
        fileStream.end();
        resolve(true); // Успешное завершение
      });

      // Обработка ошибок потока записи
      fileStream.on("error", (errorFileSteam) => {
        handleError?.(errorFileSteam);
        reject(errorFileSteam);
      });
    });

    // Обработка ошибок запроса
    request.on("error", (error) => {
      handleError?.(error);
      reject(error);
    });

    // 5. Отправляем запрос
    request.end();
  });
}

interface DownloadAndCacheFileParams {
  /**
   * URL файла для скачивания
   */
  url: string;
  /**
   * Директория для кэширования скачанных файлов
   */
  cacheDir: string;
}

/**
 * Скачивает и кэширует файл по URL в указанную директорию.
 * Возвращает полный путь к файлу.
 */
export async function downloadAndCacheFile({
  cacheDir,
  url,
}: DownloadAndCacheFileParams): Promise<string> {
  const fileName = getCacheFileName(url);
  const fullFileName = join(cacheDir, fileName);
  const sizeFile = await getFileSize(fullFileName);

  if (!sizeFile) {
    await downloadFileToCacheDir({
      fileUrl: url,
      fullFileName,
    });
  }

  return fullFileName;
}
