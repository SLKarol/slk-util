import { action, makeObservable, observable } from "mobx";

import {
  type IreceiveYaPlakalTopicMedia,
  type RedditResponsePreviewPayload,
} from "@shared/lib/types/electron-api";
import { type MediaSummaryPreview } from "@shared/lib/types/media";

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

    if (!mediaData.haveVideo)
      return window.electronAPI.telegramBotSendPicture({
        url: dataId,
      });

    window.electronAPI.telegramBotSendVideo({
      url: dataId,
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
    if (!mediaData) return;

    window.electronAPI.openUrlInBrowser(mediaData.urlTopic);
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
}
