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
      setUrlMediaRecord: action,
      clearCollection: action,
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
}
