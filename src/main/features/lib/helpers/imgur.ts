import { parse } from "node-html-parser";
import { parse as parsePath } from "path";

import { type MediaSummary } from "@shared/lib/types/media";

import { fetchHtml } from "./fetch";

export async function downloadImgurInfo(url: string): Promise<MediaSummary> {
  // Получить ID видео
  const { name: id } = parsePath(url);

  const htmlPage = await fetchHtml(`https://imgur.com/${id}`);
  const root = parse(htmlPage);
  // Найти тэг с постером
  const posterTag = root.querySelector('meta[name="twitter:image"]');
  const posterUrl = posterTag ? posterTag.getAttribute("content") : "";

  let element = root.querySelector('meta[name="twitter:player:height"]');

  const height = element
    ? parseInt(element.getAttribute("content") ?? "", 10)
    : undefined;
  element = root.querySelector('meta[name="twitter:player:width"]');
  const width = element
    ? parseInt(element.getAttribute("content") ?? "", 10)
    : undefined;
  element = root.querySelector('meta[name="twitter:player:stream"]');
  const urlVideo = element ? element.getAttribute("content") : "";
  element = root.querySelector("title");
  const title = element?.innerText.replace(" - GIF on Imgur", "");

  return {
    haveVideo: !!urlVideo,
    id,
    idVideoSource: "imgur.com",
    previewImages: { decoded: "", src: posterUrl },
    title,
    height,
    width,
    videoParts: { urlVideo },
    over18: false,
    downloadedFileName: "",
    permalink: id,
  } as MediaSummary;
}
