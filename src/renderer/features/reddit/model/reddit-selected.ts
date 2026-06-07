import { action, makeObservable, observable } from "mobx";

/**
 * Стор для хранения парамтеров, выбранных пользователем
 */
export class RedditSelectedStore {
  /**
   * id выбранного канала
   */
  selectedRedditChannel: string | null = null;

  searchRedditChannel = "";

  /**
   * Параметр для получения новых записей. Указывает на последнюю полученную запись, после которой нужно получить новые.
   */
  after: string | null = null;

  // eslint-disable-next-line no-unused-vars
  constructor() {
    makeObservable(this, {
      // observable
      after: observable,
      searchRedditChannel: observable,
      selectedRedditChannel: observable,
      // action
      setAfter: action,
      setSearchRedditChannel: action,
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

  setSearchRedditChannel = (searchRedditChannel: string) => {
    this.searchRedditChannel = searchRedditChannel;
  };

  /**
   * Установить параметр "after"
   * @param after параметр "after"
   */
  setAfter = (after: string | null) => {
    this.after = after;
  };
}
