import { makeAutoObservable } from "mobx";

import { type MediaRecordUi } from "@renderer-shared/types/media";

import { ItemsToSend } from "@renderer-features/model/items-to-send";
import { MediaPagerStore } from "@renderer-features/model/media-pager";

import { YaCollection } from "./ya-collection";
import { SelectMaterialStore } from "./ya-plakal-select-material";

/**
 * Корневое хранилище приложения для управления состоянием работы с "Ya plakal".
 *
 * Данное хранилище выступает в роли контейнера для других подчинённых хранилищ,
 * обеспечивая централизованный доступ к ним.
 */
export class YaPlakalRootStore {
  /**
   * Хранилище, отвечающее за логику выбора учебного материала.
   *
   * @remarks
   * Это хранилище управляет состоянием интерфейса и данными, связанными
   * с выбором материала для дальнейшей работы в модуле "Ya plakal".
   */
  selectMaterialStore: SelectMaterialStore;

  /**
   * Пагинатор
   */
  pager: MediaPagerStore;

  /**
   * Коллекция материалов
   */
  collection: YaCollection;

  /**
   * Список материалов для отправки
   */
  itemsToSend: ItemsToSend;

  /**
   * Флаг, указывающий, что происходит групповая отправка
   */
  groupSend = false;

  /**
   * Флаг, указывающий, что будет для каждой отправлен заголовок
   */
  sendTitle = false;

  /**
   * Создаёт экземпляр корневого хранилища.
   *
   * Инициализирует вложенные хранилища.
   */
  constructor() {
    makeAutoObservable(this);

    this.selectMaterialStore = new SelectMaterialStore();
    this.pager = new MediaPagerStore();
    this.collection = new YaCollection();
    this.itemsToSend = new ItemsToSend();
  }

  /**
   * Возвращает массив медиазаписей в формате `MediaRecordUi`, готовый для отображения в UI.
   *
   * Для каждой записи устанавливается флаг `selected` в зависимости от того,
   * присутствует ли её URL в списке выбранных (`itemsToSend`).
   *
   * @returns {MediaRecordUi[]} Массив медиазаписей с актуальным статусом выбора.
   *
   * @computed
   */
  get mediaRecords() {
    return Array.from(this.collection.mediaRecords.entries()).map(
      ([id, mediaRecord]) => ({
        selected: this.itemsToSend.items.has(id),
        mediaRecord,
      }),
    );
  }

  /**
   * Переключает состояние выбора медиазаписи по её идентификатору.
   *
   * Если запись уже выбрана, она удаляется из списка отправки.
   * Если не выбрана — добавляется в список отправки на основе данных из коллекции.
   *
   * @param {string} idMediaRecord - Идентификатор медиазаписи, выбор которой нужно переключить.
   *
   * @action
   */
  toggleItemSelect = (idMediaRecord: string) => {
    if (this.itemsToSend.items.has(idMediaRecord)) {
      this.itemsToSend.items.delete(idMediaRecord);
      return;
    }
    const record = this.collection.mediaRecords.get(idMediaRecord);
    if (record)
      this.itemsToSend.items.set(idMediaRecord, {
        id: record.id,
        title: record.title,
        fileDecode: record.fileDecode,
        filePath: record.filePath,
        previewDecode: record.previewDecode,
        previewFilePath: record.previewFilePath,
        width: record.width,
        height: record.height,
      } as MediaRecordUi);
  };

  /**
   * Отправляет выбранные медиазаписи в Telegram.
   */
  sendSelectedToTelegram = () => {
    this.groupSend = true;
    window.electronAPI.telegramBotSendGroup(
      this.itemsToSend.mediaRecords.map((record) => ({
        url: record.id,
        title: this.sendTitle ? record.title : "",
      })),
      null,
    );
  };

  /**
   * Устанавливает флаг групповой отправки в значение `false`.
   *
   * Данный метод используется для отключения режима групповой отправки,
   * например, при сбросе состояния формы или завершении операции.
   */
  setGroupSendFalse = () => {
    this.groupSend = false;
  };

  /**
   * Устанавливает значение флага отправки подписи к картинке.
   *
   * @param value - Булево значение, указывающее, нужно ли отправлять подписи.
   *                `true` — отправлять подписи, `false` — не отправлять.
   */
  setSendTitle = (value: boolean) => {
    this.sendTitle = value;
  };
}
