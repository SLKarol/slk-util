/**
 * Генерирует URL для указанной страницы форума на основе базового URL.
 *
 * Если номер страницы равен 1, возвращается исходный базовый URL без изменений.
 * Для остальных страниц формируется новый путь с параметром смещения (`offset`),
 * используемого для пагинации на форуме (по 25 сообщений на страницу).
 *
 * @param {string} baseUrl - Базовый URL темы форума (например, 'https://yaplakal.com/forum2/topic123').
 * @param {number} page - Номер страницы, начиная с 1. Определяет, какое смещение будет использовано.
 * @returns {string} Сформированный URL для запрошенной страницы.
 */
export function generateUrl(baseUrl: string, page: number): string {
  if (page === 1) {
    return baseUrl;
  }

  const offset = (page - 1) * 25;
  const urlParts = new URL(baseUrl);
  const topicPath = urlParts.pathname.split("/").pop(); // извлекаем часть с topic...

  // Формируем новый путь: /forum2/st/{offset}/{topicPath}
  const newPath = `/forum2/st/${offset}/${topicPath}`;

  return `${urlParts.origin}${newPath}`;
}
