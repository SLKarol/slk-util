import { type HTMLElement, parse } from "node-html-parser";

import { type MediaSummaryPreview } from "../../../../shared/lib/types/media";
import { fetchHtml } from "../helpers/fetch";
import { type YaplakalApiResponse } from "../types/yaplakal";

const DEFAULT_YAPLAKAL_SOURCE = "www.yaplakal.com";

/**
 * Нормализует URL, полученный с Yaplakal, приводя его к полному формату.
 *
 * Если переданный URL начинается с `//`, функция дополняет его схемой `https:`,
 * чтобы получить корректный абсолютный URL (например, `https://yaplakal.com/...`).
 * Если входное значение пустое (`null`, `undefined` или пустая строка), возвращается `null`.
 *
 * @param {string | null | undefined} rawUrl - Исходный URL, который может быть неполным или отсутствовать.
 * @returns {string | null} Нормализованный URL с добавленной схемой `https:`, или `null`, если входное значение не задано.
 */
function normalizeYapUrl(rawUrl: string | null | undefined): string | null {
  if (!rawUrl) return null;
  return rawUrl.startsWith("//") ? `https:${rawUrl}` : rawUrl;
}

/**
 * Создаёт базовую структуру объекта предварительного просмотра медиаэлемента для Yaplakal.
 *
 * Возвращает частичный объект типа `MediaSummaryPreview`, заполненный обязательными полями:
 * идентификатором источника (`idVideoSource`) и пермалинком на контент.
 * Другие поля (например, изображения, видеофайлы) могут быть добавлены позже.
 *
 * @param {string} permalink - Пермалинк на медиаэлемент (например, ссылка на пост или файл).
 * @returns {Partial<MediaSummaryPreview>} Объект с базовыми данными для отображения предпросмотра.
 *
 * @see MediaSummaryPreview — тип, описывающий полную структуру информации о медиа.
 */
function createMediaSummaryPreviewBase(
  permalink: string,
): Partial<MediaSummaryPreview> {
  return {
    idVideoSource: DEFAULT_YAPLAKAL_SOURCE,
    permalink,
  };
}

/**
 * Получить все медиа из ЯП-топика
 * @param rootPage - Корневой элемент HTML-дерева страницы
 * @param urlTopic - URL топика
 * @returns Promise с массивом медиа-объектов
 */
export async function getMediaFromTopic(
  rootPage: HTMLElement,
  urlTopic: string,
): Promise<Partial<MediaSummaryPreview>[]> {
  // todo в константу, либо настройку. Настройка- лучшее
  const mediaElements = rootPage.querySelectorAll(
    "div[rel='yapfiles'], div#player video, iframe:not(#vkwidget1), a.basic-img.attach, div.attach>img",
  );
  const promises = mediaElements.map((element) => {
    const tag = element.tagName.toLowerCase();
    // Обработка видео из iframe
    if (tag === "iframe") {
      const url = normalizeYapUrl(element.getAttribute("src"));
      if (!url) return null;
      if (url.includes("yapfiles")) {
        return getInfoFromIframe(url, urlTopic);
      }
      return null;
    }
    // Обработка видео из div[rel='yapfiles']
    if (tag === "div") {
      const id = element.getAttribute("id");
      if (!id) return null;
      const idClean = id.replace(/^yfp-[0-9]+-/, "");
      const url = `https://api.yapfiles.ru/get_player/?v=${idClean}`;
      return getInfoFromDiv(url, urlTopic);
    }
    // Обработка картинок из a.basic-img.attach
    if (tag === "a") {
      return getYapMediaImageFromLink(element, urlTopic);
    }
    if (tag === "img") {
      return getYapMediaImageFromImg(element, urlTopic);
    }

    return null;
  });

  return Promise.allSettled(promises).then((resPromises) =>
    resPromises
      .map((result) => {
        // Оставить только то, что отработало без ошибок
        const { status } = result;
        if (status === "fulfilled") {
          const { value } = result;
          return value || null;
        }
        return null;
      })
      // Оставить не-null
      .filter((r): r is Partial<MediaSummaryPreview> => r !== null),
  );
}

/**
 * Скачивание медиа-инфо из ЯП-фрейма
 * @param url - URL iframe
 * @param permalink - Пермалинк топика
 * @returns Promise с частичным объектом медиа
 */
async function getInfoFromIframe(
  url: string,
  permalink: string,
): Promise<Partial<MediaSummaryPreview>> {
  const re = createMediaSummaryPreviewBase(permalink);
  const arrayUrl = url.split("=");
  re.id = arrayUrl[arrayUrl.length - 1];
  const iframePage = await fetchHtml(url);
  const rootIframePage = parse(iframePage);
  const scriptIframe = rootIframePage.querySelector("body>script");
  if (!scriptIframe) return re;
  const scriptContent = scriptIframe.innerHTML;
  const indxBegin = scriptContent.indexOf(
    "url: 'https://api.yapfiles.ru/load/",
  );
  const indxEnd = scriptContent.indexOf("&type=json&ref=", indxBegin);
  if (indxBegin === -1 || indxEnd === -1) return re;
  const urlJson = `${scriptContent.substring(indxBegin + 6, indxEnd)}&type=json`;
  const resonse = await fetchHtml(urlJson);
  const iframeJsonData = JSON.parse(resonse) as YaplakalApiResponse;

  const data = decodeYapJson(iframeJsonData);
  Object.assign(re, data);

  return re;
}

/**
 * Декодирование JSON-ответа от Yaplakal API
 * @param data - JSON-данные от API
 * @returns Частичный объект медиа
 */
function decodeYapJson(data: YaplakalApiResponse) {
  const re: Partial<MediaSummaryPreview> = {};
  const {
    player: { file, file_hd: fileHd, poster, res },
  } = data;

  const urlVideo = fileHd || file;

  if (res) {
    const dimensions = res.split("x");
    if (dimensions.length === 2) {
      re.height = Number.parseInt(dimensions[1], 10);
      re.width = Number.parseInt(dimensions[0], 10);
    }
  }

  re.haveVideo = !!urlVideo;
  re.previewImages = { src: poster };
  re.videoParts = { urlVideo };
  return re;
}

/**
 * Получение медиа-инфо из div-элемента
 * @param url - URL для получения данных
 * @param permalink - Пермалинк топика
 * @returns Promise с частичным объектом медиа
 */
async function getInfoFromDiv(
  url: string,
  permalink: string,
): Promise<Partial<MediaSummaryPreview>> {
  const re = createMediaSummaryPreviewBase(permalink);
  const response = await fetchHtml(url);
  const root = parse(response);
  const html = root.toString();
  const indxBegin = html.indexOf("https://api.yapfiles.ru/load/");
  const indxEnd = html.indexOf("&type=json", indxBegin);
  if (indxBegin === -1 || indxEnd === -1) return re;
  const urlJson = `${html.substring(indxBegin, indxEnd)}&type=json`;
  const jsonData = await fetchHtml(urlJson);

  const data = decodeYapJson(JSON.parse(jsonData));
  Object.assign(re, data);
  return re;
}

/**
 * Получить медиа-картинку из ссылки
 * @param aElement - HTML-элемент ссылки
 * @param permalink - Пермалинк топика
 * @returns Частичный объект медиа или null
 */
function getYapMediaImageFromLink(aElement: HTMLElement, permalink: string) {
  const href = normalizeYapUrl(aElement.getAttribute("href"));
  if (!href) return null;
  const re = createMediaSummaryPreviewBase(permalink);
  re.url = href;
  re.id = href;
  const img = aElement.querySelector("img");
  if (img) {
    re.title = img.getAttribute("alt");
    const src = normalizeYapUrl(img.getAttribute("src"));
    if (src) {
      re.previewImages = { src };
    }
  }
  re.haveVideo = false;

  return re;
}

/**
 * Получить медиа-картинку из img-элемента
 * @param iElement - HTML-элемент изображения
 * @param permalink - Пермалинк топика
 * @returns Частичный объект медиа или null
 */
function getYapMediaImageFromImg(iElement: HTMLElement, permalink: string) {
  const re = createMediaSummaryPreviewBase(permalink);
  const src = normalizeYapUrl(iElement.getAttribute("src"));
  if (!src) return null;
  re.id = src;
  re.url = src;
  re.title = iElement.getAttribute("alt");
  re.previewImages = { src };
  re.haveVideo = false;
  return re;
}
