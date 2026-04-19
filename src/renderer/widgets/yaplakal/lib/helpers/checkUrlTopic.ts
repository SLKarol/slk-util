/**
 * Проверяет, соответствует ли строка шаблону URL темы на сайте YaPlakal.
 * Шаблон: https://www.yaplakal.com/forum[N]/topic[ID].html, где N и ID - числа.
 *
 * @param url - Строка для проверки
 * @returns true, если строка не пуста и соответствует шаблону, иначе false
 */
export const checkUrlTopic = (url: string): boolean => {
  // Проверяем, что строка не пуста
  if (!url || url.trim() === "") {
    return false;
  }

  // Регулярное выражение для проверки шаблона URL
  // https://www.yaplakal.com/forum[N]/topic[ID].html
  // https://www.yaplakal.com/forum[N]/st/[page]/topic[ID].html
  // где N, page и ID - числа
  const pattern =
    /^https:\/\/www\.yaplakal\.com\/forum\d+(?:\/st\/\d+)?\/topic\d+\.html$/;

  return pattern.test(url);
};
