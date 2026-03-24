import { type SihiPoem } from "@renderer-features/stihi-ru/model/types";

/**
 * Извлекает список стихотворений с HTML-страницы сайта "Стихи.ру".
 *
 * Функция парсит переданную HTML-строку, находит элементы списка стихотворений
 * (вложенные в `<ul type="square"> > <li>`) и извлекает из каждого:
 * - Ссылку и название стихотворения
 * - Имя и ID автора
 * - Дату и время публикации (из тега `<small>`)
 * - Признак "автор приглашает" (если отсутствует тег `<small>`)
 *
 * @param {string} htmlString - HTML-строка, содержащая список стихотворений.
 * @returns {SihiPoem[]} Массив объектов, представляющих стихотворения, с полями:
 *   - `href` — ссылка на стихотворение
 *   - `title` — название стихотворения
 *   - `authorId` — идентификатор автора (часть URL после `/avtor/`)
 *   - `authorName` — имя автора
 *   - `dateTime` — дата и время публикации (если указаны)
 *   - `invite` — признак, что автор приглашает (если нет `<small>`)
 */
export const getPoemsListFromHtmlString = (htmlString: string) => {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(htmlString, "text/html");

  const listElemenst = Array.from(
    htmlDoc.querySelectorAll("ul[type='square'] > li"),
  ).map((listItem) => {
    const poemSummary = {} as SihiPoem;
    // Все ссылки и их подписи
    const anchorElements = listItem.querySelectorAll("a");
    anchorElements.forEach((link, indexLink) => {
      const href = link.getAttribute("href");
      const text = link.textContent?.trim() ?? "";
      if (indexLink === 0) {
        poemSummary.href = href;
        poemSummary.title = text;
      } else {
        poemSummary.authorId = href.replace("/avtor/", "");
        poemSummary.authorName = text;
      }

      // Ищем элемент <small> и извлекаем текст без тире
      const smallElement = link.querySelector("small");
      if (smallElement) {
        const smallContent = smallElement.textContent?.trim();
        if (smallContent) {
          // Убираем тире в начале, если оно есть
          poemSummary.dateTime = smallContent.replace(/^-\s*/, "").trim();
        }
        // Если нет такого элемента, значит автор приглашает
        else {
          poemSummary.invite = true;
        }
      }
    });
    return poemSummary;
  });

  return listElemenst;
};
