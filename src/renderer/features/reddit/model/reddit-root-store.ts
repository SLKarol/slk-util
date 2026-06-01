import { makeAutoObservable } from "mobx";

import { ItemsToSend } from "@renderer-features/model/items-to-send";

import { RedditSelectedStore } from "./reddit-selected";
import { RedditSubscribeStore } from "./reddit-subscribes";

/**
 * Корневое хранилище приложения для управления состоянием работы с "Reddit".
 *
 * Данное хранилище выступает в роли контейнера для других подчинённых хранилищ,
 * обеспечивая централизованный доступ к ним.
 */
export class RedditRootStore {
  /**
   * Список материалов для отправки
   */
  itemsToSend: ItemsToSend;

  /**
   * Каналы, на которые я подписан
   */
  redditSubscribeStore: RedditSubscribeStore;

  /**
   * Стор для хранения парамтеров, выбранных пользователем
   */
  redditSelectedStore: RedditSelectedStore;

  /**
   * Флаг, указывающий, что происходит групповая отправка
   */
  groupSend = false;

  /**
   * Создаёт экземпляр корневого хранилища.
   *
   * Инициализирует вложенные хранилища.
   */
  constructor() {
    makeAutoObservable(this);

    this.itemsToSend = new ItemsToSend();
    this.redditSubscribeStore = new RedditSubscribeStore();
    this.redditSelectedStore = new RedditSelectedStore();
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
    const { searchRedditChannel } = this.redditSelectedStore;
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
}
