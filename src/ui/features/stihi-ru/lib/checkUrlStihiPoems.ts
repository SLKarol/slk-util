/**
 * Проверяет, является ли переданный URL допустимым для страницы стихов на сайте "Стихи.ру".
 *
 * Функция проверяет:
 * - Принадлежность URL к домену `https://www.stihi.ru`
 * - Корректность пути `/poems/list.html`
 * - Наличие обязательного параметра `topic` со значением `all`
 * - Наличие и числовое значение параметра `start`
 * - Опциональные параметры `day`, `month`, `year`, если они присутствуют:
 *   - Должны быть числами
 *   - `day` — от 1 до 31
 *   - `month` — от 1 до 12
 *   - `year` — больше или равен 1
 *
 * @param {string} urlString - URL-строка для проверки.
 * @returns {boolean} Возвращает `true`, если URL соответствует всем условиям, иначе — `false`.
 */
export const checkUrlStihiPoems = (urlString: string) => {
  try {
    const url = new URL(urlString);

    // Проверка хоста и пути
    if (
      url.origin !== "https://www.stihi.ru" ||
      url.pathname !== "/poems/list.html"
    ) {
      return false;
    }

    const searchParams = url.searchParams;

    // Обязательные параметры
    if (searchParams.get("topic") !== "all") {
      return false;
    }
    if (!searchParams.has("start")) {
      return false;
    }

    // Проверка числового значения start
    const startValue = searchParams.get("start");
    if (!startValue || !/^\d+$/.test(startValue)) {
      return false;
    }

    // Опциональные параметры: day, month, year
    const optionalParams = ["day", "month", "year"];
    for (const param of optionalParams) {
      const value = searchParams.get(param);
      if (value !== null) {
        if (!/^\d+$/.test(value)) {
          return false; // Не число
        }
        // Дополнительная проверка диапазонов
        if (
          param === "day" &&
          (parseInt(value, 10) < 1 || parseInt(value, 10) > 31)
        ) {
          return false;
        }
        if (
          param === "month" &&
          (parseInt(value, 10) < 1 || parseInt(value, 10) > 12)
        ) {
          return false;
        }
        if (param === "year" && parseInt(value, 10) < 1) {
          return false;
        }
      }
    }

    return true;
  } catch (error) {
    return false;
  }
};
