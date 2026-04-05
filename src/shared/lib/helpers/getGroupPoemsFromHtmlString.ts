import { type SihiChapter } from "../types/stihi.types";

/**
 * Из HTML-строки получить список ссылок на группы стихов
 * @param htmlString html-строка
 * @returns группы стихов
 */
export const getGroupPoemsFromHtmlString = (htmlDoc: Document) => {
  const links = htmlDoc.querySelectorAll('a[href^="/poems/list.html?"]');
  // Регулярное выражение для шаблона N-T (числа через дефис)
  const numberPattern = /^\d+-\d+$/;

  const linksFiltered = Array.from(links).filter((link) => {
    const linkText = link.textContent.trim();
    return numberPattern.test(linkText);
  });

  const linkTextContent = linksFiltered.map((link) => ({
    textContent: link.textContent,
    href: link.getAttribute("href"),
  }));

  return linkTextContent as SihiChapter[];
};
