import { access } from "fs/promises";

/**
 * Проверяет наличие файла по указанному пути.
 *
 * @param filePath - Путь к файлу, который необходимо проверить.
 * @returns Возвращает `true`, если файл существует, и `false` в противном случае.
 */
export async function fileExists(filePath: string): Promise<boolean> {
  return await access(filePath)
    .then(() => true)
    .catch(() => false);
}
