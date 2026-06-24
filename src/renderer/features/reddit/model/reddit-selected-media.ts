import { action, makeObservable, observable } from "mobx";

import { MediaRecordStore } from "@renderer-features/model/media-record";

/**
 * Класс для хранения media-записей от Reddit.
 * todo delete
 */
export class RedditSelectedMedia {
  /**
   * Map для хранения media-записей.
   * Ключ - ссылка (полноценный урл: https://... ), значение - MediaRecordStore
   */
  selectedRecords: Map<string, MediaRecordStore> = new Map();

  constructor() {
    makeObservable(this, {
      // observable
      selectedRecords: observable,
      // action
      deleteItem: action,
      clearSelected: action,
      openTopicInBrowser: action,
      sendMediaToTelegram: action,
      // computed
    });
  }

  /**
   * Очистить коллекцию
   */
  clearSelected = () => {
    this.selectedRecords.clear();
  };

  /**
   * Отправить медиа в телеграм
   * @param dataId Id записи
   * @param sendAsFile Отправить как файл
   */
  sendMediaToTelegram = (dataId: string, sendAsFile?: boolean) => {
    const mediaData = this.selectedRecords.get(dataId);
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
    const mediaData = this.selectedRecords.get(dataId);
    if (!mediaData) return;

    window.electronAPI.openUrlInBrowser(mediaData.urlTopic);
  };

  deleteItem = (idMediaRecord: string) => {
    if (this.selectedRecords.has(idMediaRecord)) {
      this.selectedRecords.delete(idMediaRecord);
    }
  };
}
