import { action, makeObservable, observable } from "mobx";

/**
 * Стор для хранения парамтеров, выбранных пользователем
 */
export class RedditSelectedStore {
  /**
   * id выбранного канала
   */
  selectedRedditChannel: string | null = null;

  // eslint-disable-next-line no-unused-vars
  constructor() {
    makeObservable(this, {
      // observable
      selectedRedditChannel: observable,
      // action
      setSelectedRedditChannel: action,
      // computed
    });
  }

  /**
   * Выбрать канал
   * @param channelId id канала
   */
  setSelectedRedditChannel = (channelId: string | null) => {
    this.selectedRedditChannel = channelId;
  };
}
