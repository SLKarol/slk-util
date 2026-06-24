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
      setRecordTitle: action,
      addItem: action,
      clearItems: action,
      // computed
      countSelected: computed,
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
          url: mediaRecord.fileDecode,
          title: mediaRecord.title,
          selected: true,
          width: mediaRecord.width,
          height: mediaRecord.height,
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

  /**
   * Количество выбранных элементов
   */
  get countSelected() {
    return this.items.size;
  }

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
    const mediaRecord = this.items.get(idMediaRecord);
    if (!mediaRecord) return;

    this.items.set(idMediaRecord, {
      ...mediaRecord,
      title,
    });
  };

  addItem = (idMediaRecord: string, record: MediaRecordUi) => {
    this.items.set(idMediaRecord, record);
  };

  /**
   * Очищает коллекцию элементов для отправки.
   */
  clearItems = () => {
    this.items.clear();
  };
}
