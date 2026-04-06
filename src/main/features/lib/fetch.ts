import { REQUEST_HEADERS } from "@main/shared/lib/constants";

/**
 * Выполняет GET-запрос по указанному URL и возвращает HTML-содержимое страницы.
 *
 * @param url - URL-адрес для запроса.
 * @returns Асинхронно возвращает HTML-содержимое страницы в виде строки.
 * @throws Ошибка при сетевом сбое или проблемах с кодировкой.
 */
export async function fetchHtml(
  url: string,
  params?: RequestInit,
): Promise<string> {
  const response = await fetch(url, {
    method: "GET",
    headers: REQUEST_HEADERS,
    ...params,
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
  return decoder.decode(uint8Array);
}
