import { action, makeObservable, observable } from "mobx";

import { type IreceiveYaPlakalTopicMedia } from "@shared/lib/types/electron-api";
import { type MediaSummaryPreview } from "@shared/lib/types/media";

import { MediaRecordStore } from "@renderer-features/model/media-record";

/**
 * Класс для хранения media-записей от Я.
 */
export class YaCollection {
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
      // computed
    });
  }

  /**
   * Добавить media-записи в коллекцию
   */
  addMediaRecords = (mediaInfo: Partial<MediaSummaryPreview>[]) => {
    mediaInfo.forEach(({ url, ...mediaSummary }) => {
      let keyMedia = url;
      if (!keyMedia) {
        keyMedia = mediaSummary.id;
      }
      if (keyMedia)
        this.mediaRecords.set(keyMedia, new MediaRecordStore(mediaSummary));
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
      urlPreview: mediaData.previewImages.src,
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

    this.mediaRecords.set(idMediaRecord, {
      ...mediaRecord,
      title,
    });
  };
}
