import path from "path";
import { URL } from "url";

/**
 * Извлекает расширение файла из URL-адреса.
 *
 * @param urlString - Строка с валидным URL-адресом.
 * @returns Расширение файла в нижнем регистре без точки (например, `"jpg"`, `"png"`),
 *          или `null`, если расширение отсутствует.
 */
export function getExtFromUrl(urlString: string) {
  const { pathname } = new URL(urlString);
  const ext = path.extname(pathname); // возвращает с точкой: ".jpg"

  return ext ? ext.slice(1).toLowerCase() : null; // убираем точку, вернём "jpg"
}
