import { parse } from "node-html-parser";

import { type RedGifsJson } from "../types/media";

import { type MediaSummaryPreview } from "@shared/lib/types/media";

import { fetchHtml } from "./fetch";

export async function downloadRedGifsInfo(
  url: string,
): Promise<MediaSummaryPreview> {
  const htmlPage = await fetchHtml(url);
  const root = parse(htmlPage);
  const json = root.querySelector("script[type=application/ld+json]");

  const jsonData = json
    ? (JSON.parse(json.innerText) as RedGifsJson)
    : ({} as RedGifsJson);

  const arrayUrl = /https:\/\/(www\.)?redgifs.com\/watch\/\w+/.exec(url) ?? [
    "",
  ];
  const arrayName = arrayUrl[0].split("/").reverse();

  const { thumbnailUrl, height, width, contentUrl, name } =
    jsonData.video ?? {};

  return {
    haveVideo: true,
    id: arrayName[0],
    idVideoSource: "www.redgifs.com",
    over18: true,
    previewImages: { src: thumbnailUrl },
    title: name,
    videoParts: { urlVideo: contentUrl },
    height,
    width,
    downloadedFileName: "",
    permalink: "",
  } as MediaSummaryPreview;
}
