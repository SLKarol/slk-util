import { makeAutoObservable } from "mobx";

import { type Nullable } from "@shared/lib/types/common";
import {
  type MediaAlbum,
  type MediaPreview,
  type MediaPreviewContent,
  type MediaSummaryPreview,
  type VideoParts,
} from "@shared/lib/types/media";

/**
 * Предпросмотр медиа-ресурса.
 * Отвечает за содержание и отображение информации о медиа-ресурсе.
 */
export class MediaRecordStore implements MediaSummaryPreview {
  id: string;
  idVideoSource: string;
  title: string;
  previewImages: Partial<MediaPreview>;
  over18: boolean;
  haveVideo: boolean;
  videoParts: VideoParts;
  downloadedFileName: string;

  // Опциональные поля
  subReddit: Nullable<string>;
  width: Nullable<number>;
  height: Nullable<number>;
  permalink: Nullable<string>;
  url: Nullable<string>;
  created: Nullable<string>;
  subtitles: Nullable<
    { baseUrl: string; languageCode: string; languageName: string }[]
  >;
  collection: Nullable<MediaAlbum>;
  listFormats: Nullable<Map<string, number[]>>;
  noMedia: Nullable<boolean>;

  // Поля из MediaSummaryPreview
  preview: Nullable<MediaPreviewContent>;

  constructor({
    collection,
    created,
    downloadedFileName,
    haveVideo,
    height,
    id,
    idVideoSource,
    listFormats,
    noMedia,
    over18,
    permalink,
    preview,
    previewImages,
    subReddit,
    subtitles,
    title,
    url,
    videoParts,
    width,
  }: Partial<MediaSummaryPreview>) {
    this.id = id ?? "";
    this.idVideoSource = idVideoSource ?? "";
    this.title = title ?? "";
    this.previewImages = previewImages ?? {
      height: null,
      width: null,
      src: "",
    };
    this.over18 = over18 ?? false;
    this.haveVideo = haveVideo ?? false;
    this.videoParts = videoParts ?? { urlVideo: "" };
    this.downloadedFileName = downloadedFileName ?? "";

    this.subReddit = subReddit ?? null;
    this.width = width ?? null;
    this.height = height ?? null;
    this.permalink = permalink ?? null;
    this.url = url ?? null;
    this.created = created ?? null;
    this.subtitles = subtitles ?? null;
    this.collection = collection ?? null;
    this.listFormats = listFormats ?? null;
    this.noMedia = noMedia ?? null;
    this.preview = preview ?? null;

    makeAutoObservable(this);
  }
}
