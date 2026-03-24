/**
 * Парсит атрибут 'expires' из строки cookie и возвращает его в виде объекта Date.
 *
 * @param cookieString - Строка cookie, содержащая атрибут 'expires'.
 * @returns Объект Date, представляющий дату истечения срока действия, если он найден; иначе — null.
 */
export function parseCookieExpires(cookieString: string) {
  // Регулярное выражение для поиска значения expires
  const expiresRegex = /expires=([^;]+)/g;
  const matches = cookieString.match(expiresRegex);
  if (matches) {
    // Берём первое найденное значение (все одинаковые)
    const expiresString = matches[0].replace("expires=", "").trim();
    // Преобразуем в объект Date
    const expiresDate = new Date(expiresString);
    return expiresDate;
  } else {
    return null;
  }
}
