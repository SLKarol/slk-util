/**
 * Из HTML-строки получить список ссылок на группы стихов
 * @param htmlString html-строка
 * @returns группы стихов
 */
export const getGroupListFromHtmlString = (htmlString: string) => {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(htmlString, "text/html");

  const links = htmlDoc.querySelectorAll('a[href^="/poems/list.html?"]');
  // Регулярное выражение для шаблона N-T (числа через дефис)
  const numberPattern = /^\d+-\d+$/;

  const linksFiltered = Array.from(links).filter((link) => {
    const linkText = link.textContent.trim();
    return numberPattern.test(linkText);
  });

  const linkTextContent = linksFiltered.map((link) => link.textContent);

  return linkTextContent;
};
