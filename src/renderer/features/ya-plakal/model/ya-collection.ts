import { action, computed, makeObservable, observable } from "mobx";

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
    });
  }

  /**
   * Добавить media-записи в коллекцию
   */
  addMediaRecords = (mediaInfo: Partial<MediaSummaryPreview>[]) => {
    mediaInfo.forEach(({ url, ...mediaSummary }) => {
      if (!url) return;
      this.mediaRecords.set(url, new MediaRecordStore(mediaSummary));
    });
  };
}
