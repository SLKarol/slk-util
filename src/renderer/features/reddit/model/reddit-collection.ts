import { action, keys, makeObservable, observable } from "mobx";

import {
  type IreceiveYaPlakalTopicMedia,
  type RedditResponsePreviewPayload,
  type SendRedditCollectionPayload,
  type TelegramBotSendPicturePayload,
} from "@shared/lib/types/electron-api";
import {
  type MediaAlbum,
  type MediaSummaryPreview,
} from "@shared/lib/types/media";

import { MediaRecordStore } from "@renderer-features/model/media-record";

/**
 * Класс для хранения media-записей от Reddit.
 */
export class RedditCollection {
  /**
   * Map для хранения media-записей.
   * Ключ - ссылка (полноценный урл: https://... ), значение - MediaRecordStore
   */
  mediaRecords: Map<string, MediaRecordStore> = new Map();

  constructor() {
    makeObservable(this, {
      // observable
      mediaRecords: observable,
      // action
      addMediaRecords: action,
      clearCollection: action,
      openTopicInBrowser: action,
      setRecordTitle: action,
      sendMediaToTelegram: action,
      setUrlMediaRecord: action,
      updateMediaPreview: action,
      redditResponseCollection: action,
      saveMedia: action,
      copyUrlToClipBoard: action,
      // computed
    });
  }

  /**
   * Добавить media-записи в коллекцию
   */
  addMediaRecords = (mediaInfo: Partial<MediaSummaryPreview>[]) => {
    mediaInfo.forEach((mediaRecord) => {
      if (mediaRecord.id)
        this.mediaRecords.set(
          mediaRecord.id,
          new MediaRecordStore(mediaRecord),
        );
    });
  };

  /**
   * Установить декодированные значения для media-записи
   */
  setUrlMediaRecord = ({ id, ...decodeData }: IreceiveYaPlakalTopicMedia) => {
    this.mediaRecords.get(id)?.setDecodeData(decodeData);
  };

  /**
   * Очистить коллекцию
   */
  clearCollection = () => {
    this.mediaRecords.clear();
  };

  /**
   * Отправить медиа в телеграм
   * @param dataId Id записи
   * @param sendAsFile Отправить как файл
   */
  sendMediaToTelegram = (dataId: string, sendAsFile?: boolean) => {
    const mediaData = this.mediaRecords.get(dataId);
    if (!mediaData) return;

    if (mediaData.collection) {
      const picturesToTelegram = [] as TelegramBotSendPicturePayload[];

      keys(mediaData.collection).forEach((keyOfCollection) => {
        const { id, url } = (mediaData.collection as MediaAlbum)[
          keyOfCollection as string
        ];

        picturesToTelegram.push({ id, url, title: mediaData.title });
      });

      return window.electronAPI.telegramBotSendGroup({
        holidayName: null,
        pictures: picturesToTelegram,
        shouldWriteAboutHolidayWithAI: false,
      });
    }

    // Случай для reddit-video
    if (mediaData.videoParts.urlVideo && !mediaData.videoParts.urlAudio) {
      return window.electronAPI.telegramBotSendVideo({
        id: mediaData.id,
        url: mediaData.videoParts.urlVideo,
        urlPreview: mediaData.previewImages?.src ?? "",
        sendAsFile,
        title: mediaData.title,
      });
    }

    if (!mediaData.haveVideo)
      return window.electronAPI.telegramBotSendPicture({
        id: mediaData.id,
        url: mediaData.url ?? "",
        title: mediaData.title,
      });

    if (mediaData.url)
      window.electronAPI.telegramBotSendVideo({
        id: mediaData.id,
        url: mediaData.url,
        urlPreview: mediaData.previewImages?.src ?? "",
        sendAsFile,
        title: mediaData.title,
      });
  };

  /**
   * Открыть топик в браузере
   * @param dataId Id записи
   * */
  openTopicInBrowser = (dataId: string) => {
    const mediaData = this.mediaRecords.get(dataId);
    if (!mediaData || !mediaData.permalink) return;

    window.electronAPI.openUrlInBrowser(
      `https://www.reddit.com${mediaData.permalink}`,
    );
  };

  /**
   * Изменяет название медиа-ресурса по его идентификатору.
   */
  setRecordTitle = ({
    idMediaRecord,
    title,
  }: {
    idMediaRecord: string;
    title: string;
  }) => {
    const mediaRecord = this.mediaRecords.get(idMediaRecord);
    if (!mediaRecord) return;

    mediaRecord.title = title;
  };

  /**
   * Обновляет превью медиа-ресурса.
   * @param param0 - Данные для обновления превью
   */
  updateMediaPreview = ({ id, preview }: RedditResponsePreviewPayload) => {
    const mediaRecord = this.mediaRecords.get(id);

    if (!mediaRecord) return;

    mediaRecord.setPreview(preview);
  };

  /**
   * Записывает коллекцию в mediaRecord
   */
  redditResponseCollection = ({
    collection,
    id,
  }: SendRedditCollectionPayload) => {
    const mediaRecord = this.mediaRecords.get(id);

    if (!mediaRecord) return;

    mediaRecord.setCollection(collection);
  };

  /**
   * Сохраняет медиа-файл по его идентификатору.
   * @param dataId - Идентификатор стора медиа-файла
   */
  saveMedia = (dataId: string) => {
    const url = this.mediaRecords.get(dataId as string)?.url;
    if (url) {
      window.electronAPI.saveMediaFile({ url });
    }
  };

  /**
   * Открыть топик в браузере
   * @param dataId Id записи
   * */
  copyUrlToClipBoard = (dataId: string) => {
    const mediaData = this.mediaRecords.get(dataId);
    if (!mediaData || !mediaData.url) return;

    window.electronAPI.copyTextToClipBoard(mediaData.url);
  };
}
