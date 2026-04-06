import { getPoemsFromHtmlDoc } from "@shared/lib/helpers/getPoemsFromHtmlDoc";

/**
 * Извлекает список стихотворений с HTML-страницы сайта "Стихи.ру".
 */
export const getPoemsListFromHtmlString = (htmlString: string) => {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(htmlString, "text/html");

  return getPoemsFromHtmlDoc(htmlDoc);
};
