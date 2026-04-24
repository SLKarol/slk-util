import { readFile } from "fs/promises";
import { extname } from "path";

import { MIME_TYPES } from "../constants";

/**
 * Асинхронно декодирует изображение по указанному пути и возвращает его в формате Data URL (base64).
 *
 * @param {string} filePath - Путь к файлу изображения на диске.
 * @returns {Promise<string | undefined>} Возвращает строку в формате Data URL (`data:mime-type;base64,...`),
 *                                       содержащую закодированное изображение. В случае ошибки возвращает `undefined`.
 * @throws {Error} Возникает при невозможности прочитать файл (например, файл не существует или недоступен).
 *
 * @todo Реализовать логирование ошибки вместо вывода в консоль.
 * @todo Удалить отладочное сообщение `console.log("error", error)` после завершения отладки.
 */
export const decodeImageUrlTo64 = async (filePath: string) => {
  try {
    const data = await readFile(filePath);
    const base64 = data.toString("base64");
    // Автоматически определяем формат по расширению
    const ext = extname(filePath).toLowerCase().replace(".", "");
    const mimeType = getMimeType(ext);

    const dataUrl = `data:${mimeType};base64,${base64}`;
    return dataUrl;
  } catch (error) {
    // todo логировать ошибку
    console.log("error", error); // todo удалить после отладки "error
  }
};

/**
 * Вернуть MIME-тип по имени файла
 */
export function getMimeType(fileExtension: string) {
  return MIME_TYPES.get(fileExtension);
}
