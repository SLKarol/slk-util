import { readdir, rm } from "fs/promises";
import path from "path";

interface EmptyDirOptions {
  /** Игнорировать ошибки доступа/удаления */
  ignoreErrors?: boolean;
  /** Фильтр по имени файла/папки */
  filter?: (name: string) => boolean;
}

/**
 * Асинхронно очищает директорию, удаляя все её содержимое (файлы и поддиректории).
 *
 * @throws {Error} Выбрасывает ошибку, если не удалось удалить элемент и опция `ignoreErrors` не включена.
 *
 * @remarks
 * Использует `fs.promises.rm` с опциями `recursive: true` и `force: true`, что позволяет:
 * - Рекурсивно удалять вложенные папки.
 * - Не выбрасывать ошибку, если файл или папка не существует.
 *
 * Внимание: `force: true` подавляет некоторые системные ошибки (например, EPERM на Windows),
 * поэтому используйте с осторожностью в продакшене.
 */
export async function emptyDirectory(
  dirPath: string,
  options: EmptyDirOptions = {},
): Promise<void> {
  const { ignoreErrors = false, filter } = options;
  const entries = await readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (filter && !filter(entry.name)) continue;

    const fullPath = path.join(dirPath, entry.name);
    try {
      // recursive: true нужен для вложенных папок, для файлов он просто игнорируется
      await rm(fullPath, { recursive: true, force: true });
    } catch (err) {
      if (!ignoreErrors) throw err;
      console.warn(`⚠️ Пропущено ${fullPath}: ${(err as Error).message}`);
    }
  }
}
