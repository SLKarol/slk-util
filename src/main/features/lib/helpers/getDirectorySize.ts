import { readdir, stat } from "fs/promises";
import path from "path";

/**
 * Рекурсивно вычисляет общий размер директории, включая все вложенные файлы и поддиректории.
 *
 * @param {string} dirPath - Путь к директории, размер которой необходимо рассчитать.
 * @returns {Promise<number>} Промис, который возвращает общий размер директории в байтах.
 *
 * @throws {Error} Может выбросить ошибку, если путь не существует или недоступен для чтения.
 */
export async function getDirectorySize(dirPath: string): Promise<number> {
  const entries = await readdir(dirPath, { withFileTypes: true });
  let totalSize = 0;

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    // stat() следует за симлинками (вернёт размер целевого файла)
    // Если нужен размер самого симлинка, замените на lstat()
    const stats = await stat(fullPath);

    if (stats.isFile()) {
      totalSize += stats.size;
    } else if (stats.isDirectory()) {
      totalSize += await getDirectorySize(fullPath);
    }
  }
  return totalSize;
}
