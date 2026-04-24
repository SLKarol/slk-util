import { action, computed, makeObservable, observable } from "mobx";

import { type MediaRecordUi } from "@renderer-shared/types/media";

/**
 * Класс, представляющий модель данных для управления списком элементов, отправляемых в рассылку.
 */
export class ItemsToSend {
  /**
   * Карта медиаэлементов
   * @observable
   */
  items = new Map<string, MediaRecordUi>();

  constructor() {
    makeObservable(this, {
      // observable
      items: observable,
      // action
      deleteItem: action,
      // computed
      mediaRecords: computed,
    });
  }

  /**
   * Возвращает массив медиазаписей в формате `MediaRecordUi`, готовый к использованию в UI.
   * @returns {MediaRecordUi[]} Массив медиазаписей с установленным флагом `selected: true`.
   *
   * @computed
   */
  get mediaRecords() {
    return Array.from(this.items.entries()).map(
      ([url, mediaRecord]) =>
        ({
          id: url,
          url: mediaRecord.url,
          title: mediaRecord.title,
          selected: true,
        }) as MediaRecordUi,
    );
  }

  /**
   * Удаляет медиазапись из коллекции по её идентификатору.
   * @param {string} idMediaRecord - Идентификатор (URL) удаляемой медиазаписи.
   *
   * @action
   */
  deleteItem = (idMediaRecord: string) => {
    if (this.items.has(idMediaRecord)) {
      this.items.delete(idMediaRecord);
    }
  };
}
