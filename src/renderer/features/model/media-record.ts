import { notifications } from "@mantine/notifications";
import { action, makeObservable, observable, runInAction } from "mobx";

import { type Nullable } from "@shared/lib/types/common";
import {
  type IreceiveYaPlakalTopicMedia,
  RedditMediaPreviewContent,
} from "@shared/lib/types/electron-api";
import {
  type MediaAlbum,
  type MediaPreview,
  type MediaPreviewContent,
  type MediaSummaryPreview,
  type VideoParts,
} from "@shared/lib/types/media";
import { getImageSizeFromDataURL } from "@renderer-shared/lib";

/**
 * Предпросмотр медиа-ресурса.
 * Отвечает за содержание и отображение информации о медиа-ресурсе.
 */
export class MediaRecordStore {
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

  /**
   * Декодированное содержимое файла.
   */
  fileDecode: string | null = null;
  /**
   * Путь к файлу с декодированным содержимым.
   */
  filePath: string | null = null;
  /**
   * Декодированное содержимое превью (для видео).
   */
  previewDecode: string | null = null;
  /**
   * Путь к файлу с декодированным содержимым превью.
   */
  previewFilePath: string | null = null;

  /**
   * Ссылка на веб-адрес, который содержит медиа-ресурс
   */
  urlTopic = "";

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
    urlTopic,
  }: Partial<MediaSummaryPreview>) {
    this.collection = collection ?? null;
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
    this.listFormats = listFormats ?? null;
    this.noMedia = noMedia ?? null;
    this.preview = preview ?? null;
    this.urlTopic = urlTopic ?? "";

    // makeAutoObservable(this);
    makeObservable(this, {
      id: observable,
      idVideoSource: observable,
      title: observable,
      previewImages: observable,
      over18: observable,
      haveVideo: observable,
      videoParts: observable,
      downloadedFileName: observable,
      subReddit: observable,
      width: observable,
      height: observable,
      permalink: observable,
      url: observable,
      created: observable,
      subtitles: observable,
      collection: observable,
      listFormats: observable,
      noMedia: observable,
      preview: observable,
      urlTopic: observable,
      fileDecode: observable,
      filePath: observable,
      previewDecode: observable,
      previewFilePath: observable,

      setDecodeData: action,
      setPreview: action,
      setCollection: action,
      setTitle: action,
    });
  }

  /**
   * Устанавливает данные по контенту- декодированные значения.
   */
  setDecodeData = async ({
    fileDecode,
    filePath,
    previewDecode,
    previewFilePath,
  }: Omit<IreceiveYaPlakalTopicMedia, "id">) => {
    this.fileDecode = fileDecode;
    this.filePath = filePath;
    this.previewDecode = previewDecode;
    this.previewFilePath = previewFilePath;
    if (this.haveVideo || !fileDecode) return;

    try {
      const imgDimensions = await getImageSizeFromDataURL(fileDecode);
      runInAction(() => {
        this.width = imgDimensions.width;
        this.height = imgDimensions.height;
      });
    } catch (error) {
      notifications.show({ message: JSON.stringify(error) });
    }
  };

  /**
   * Устанавливает данные для превью.
   * @param param0 - Данные для превью
   */
  setPreview = ({ decoded, height, width }: RedditMediaPreviewContent) => {
    this.fileDecode = decoded;
    this.height = height;
    this.width = width;
  };

  /**
   * Задать коллекцию для медиа-записи.
   */
  setCollection = (collection: MediaAlbum) => {
    Object.keys(collection).forEach((keyOfCollection) => {
      if (this.collection && this.collection[keyOfCollection])
        this.collection[keyOfCollection].data =
          collection[keyOfCollection].data;
    });
  };

  /**
   * Устанавливает название медиа-записи.
   * @param title Новое название
   */
  setTitle = (title: string) => {
    this.title = title;
  };
}
