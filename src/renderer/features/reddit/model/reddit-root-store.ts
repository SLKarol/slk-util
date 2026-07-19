import { action, computed, makeObservable, observable } from "mobx";

import {
  type RedditResponseNewRecordsData,
  type TelegramBotSendPicturePayload,
} from "@shared/lib/types/electron-api";
import { MediaRecordUi } from "@renderer-shared/types/media";

import { ItemsToSend } from "@renderer-features/model/items-to-send";

import { RedditCollection } from "./reddit-collection";
import { RedditSubscribeStore } from "./reddit-subscribes";
import { RedditUserSelectedStore } from "./reddit-user-selected";

/**
 * Корневое хранилище приложения для управления состоянием работы с "Reddit".
 *
 * Данное хранилище выступает в роли контейнера для других подчинённых хранилищ,
 * обеспечивая централизованный доступ к ним.
 */
export class RedditRootStore {
  /**
   * Каналы, на которые я подписан
   */
  redditSubscribeStore: RedditSubscribeStore;

  /**
   * Стор для хранения парамтеров, выбранных пользователем
   */
  redditUserSelectedStore: RedditUserSelectedStore;

  /**
   * Коллекция материалов Reddit-канала
   */
  redditCollection: RedditCollection;

  /**
   * Флаг, указывающий, что происходит групповая отправка
   */
  groupSend = false;

  /**
   * Флаг, указывающий, что происходит загрузка данных или выполнение другой асинхронной операции, связанной с Reddit
   */
  busy = false;

  /**
   * Список материалов для отправки
   */
  itemsToSend: ItemsToSend;

  /**
   * Флаг, указывающий, что нужно отправлять название праздника
   */
  sendHolidayName = true;

  /**
   * Создаёт экземпляр корневого хранилища.
   *
   * Инициализирует вложенные хранилища.
   */
  constructor() {
    this.redditSubscribeStore = new RedditSubscribeStore();
    this.redditUserSelectedStore = new RedditUserSelectedStore();
    this.redditCollection = new RedditCollection();
    // ? Зачем это?
    // this.redditSelectedMedia = new RedditSelectedMedia();
    this.itemsToSend = new ItemsToSend();

    makeObservable(this, {
      redditSubscribeStore: observable,
      redditUserSelectedStore: observable,
      redditCollection: observable,
      itemsToSend: observable,
      sendHolidayName: observable,

      redditResponseNewRecords: action,
      redditReceiveNewRecords: action,
      toggleItemSelect: action,
      sendSelectedToTelegram: action,
      toggleSendHolidayName: action,
      redditReceiveNextRecords: action,

      findRedditChannels: computed,
      mediaRecords: computed,
    });
  }

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
   * Ищет каналы Reddit по ID или названию (title), содержащие строку из поискового запроса.
   * Поиск регистронезависимый, с использованием регулярного выражения.
   *
   * @returns Отфильтрованный массив каналов, соответствующих критерию поиска
   */
  get findRedditChannels() {
    const { searchRedditChannel } = this.redditUserSelectedStore;
    if (!searchRedditChannel) return this.redditSubscribeStore.subscribes;

    const query = searchRedditChannel.trim();
    if (!query) return this.redditSubscribeStore.subscribes;

    const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"); // экранируем спецсимволы и делаем регистронезависимым

    return this.redditSubscribeStore.subscribes.filter((channel) => {
      const id = channel.id || "";
      const title = channel.title || "";
      return regex.test(id) || regex.test(title);
    });
  }

  /**
   * Получает новые записи из выбранного канала Reddit.
   */
  redditResponseNewRecords = ({
    after,
    channel,
    records,
  }: RedditResponseNewRecordsData) => {
    if (channel !== this.redditUserSelectedStore.selectedRedditChannel) return;

    this.redditUserSelectedStore.setAfter(after);
    this.redditCollection.addMediaRecords(records);
    this.busy = false;
  };

  /**
   * Запросить новые записи из выбранного канала Reddit.
   */
  redditReceiveNewRecords = () => {
    if (!this.redditUserSelectedStore.selectedRedditChannel) return;

    this.busy = true;
    this.redditUserSelectedStore.setAfter(null);
    this.redditCollection.clearCollection();

    window.electronAPI.redditReceiveNewRecords({
      after: this.redditUserSelectedStore.after,
      channel: this.redditUserSelectedStore.selectedRedditChannel,
    });
  };

  /**
   * Получить список материалов Reddit-канала с признаком выбранности
   */
  get mediaRecords() {
    return Array.from(this.redditCollection.mediaRecords.entries()).map(
      ([id, mediaRecord]) => ({
        selected: this.itemsToSend.items.has(id),
        mediaRecord,
      }),
    );
  }

  toggleItemSelect = (idMediaRecord: string) => {
    if (this.itemsToSend.items.has(idMediaRecord)) {
      this.itemsToSend.items.delete(idMediaRecord);
      return;
    }
    const record = this.redditCollection.mediaRecords.get(idMediaRecord);
    if (record)
      this.itemsToSend.addItem(idMediaRecord, {
        id: record.id,
        title: record.title,
        fileDecode: record.fileDecode,
        filePath: record.filePath,
        previewDecode: record.previewDecode,
        previewFilePath: record.previewFilePath,
        width: record.width,
        height: record.height,
        url: record.url,
      } as MediaRecordUi);
  };

  /**
   * Отправляет выбранные медиазаписи в Telegram.
   * @param {string} selectedHoliday - Название выбранного праздника
   */
  sendSelectedToTelegram = (selectedHoliday: string) => {
    const picturesToTelegram = [] as TelegramBotSendPicturePayload[];
    this.itemsToSend.items.forEach((record) => {
      if (record.url) {
        picturesToTelegram.push({ url: record.url, title: record.title });
      }
    });
    window.electronAPI.telegramBotSendGroup(
      picturesToTelegram,
      this.sendHolidayName ? selectedHoliday : null,
    );
  };

  toggleSendHolidayName = () => {
    this.sendHolidayName = !this.sendHolidayName;
  };

  redditReceiveNextRecords = () => {
    if (!this.redditUserSelectedStore.selectedRedditChannel) return;

    this.busy = true;

    window.electronAPI.redditReceiveNewRecords({
      after: this.redditUserSelectedStore.after,
      channel: this.redditUserSelectedStore.selectedRedditChannel,
    });
  };
}
