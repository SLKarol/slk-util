import { type SihiPoem } from "../types/stihiru.types";

/**
 * Отбирает из HTML-документа список стихотворений
 * @param htmlDoc HTML-документ
 * @returns Массив объектов с информацией о стихотворениях
 */
export const getPoemsFromHtmlDoc = (htmlDoc: Document) => {
  const listElemenst = Array.from(
    htmlDoc.querySelectorAll("ul[type='square'] > li"),
  ).map((listItem) => {
    const poemSummary = {} as SihiPoem;
    // Все ссылки и их подписи
    const anchorElements = listItem.querySelectorAll("a");
    anchorElements.forEach((link, indexLink) => {
      const href = link.getAttribute("href") ?? "";
      const text = link.textContent?.trim() ?? "";
      if (indexLink === 0) {
        poemSummary.href = href;
        poemSummary.title = text;
      } else {
        poemSummary.authorId = href.replace("/avtor/", "");
        poemSummary.authorName = text;
      }
    });

    // Ищем элемент <small> и извлекаем текст без тире
    const smallElement = listItem.querySelector("small");
    if (smallElement) {
      const smallContent = smallElement.textContent?.trim();
      if (smallContent) {
        // Убираем тире в начале, если оно есть
        poemSummary.dateTime = smallContent.replace(/^-\s*/, "").trim();
      }
    }
    // Если нет такого элемента, значит автор приглашает
    else {
      poemSummary.invite = true;
    }

    return poemSummary;
  });

  return listElemenst;
};
