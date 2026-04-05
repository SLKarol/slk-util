/**
 * Преобразует строку с HTML-разметкой в объект `Document`.
 */
export const parseStringToHTML = (htmlString: string) => {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(htmlString, "text/html");
  return htmlDoc;
};
