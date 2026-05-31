import { action, computed, makeObservable, observable } from "mobx";

export interface Subscribe {
  id: string;
  over18: boolean;
  title: string;
}

/**
 * Подписка на реддит
 */
class RedditSubscribe {
  /**
   * Часть URL'a, указывающая на канал
   */
  id: string;

  /**
   * Наличие 18+ контента
   */
  over18: boolean;

  /**
   * Название канала
   */
  title: string;

  constructor(subscribe: Subscribe) {
    this.id = subscribe.id;
    this.over18 = subscribe.over18;
    this.title = subscribe.title;

    makeObservable(this, {
      id: observable,
      over18: observable,
      title: observable,
    });
  }
}

export class RedditSubscribeStore {
  subscribes: RedditSubscribe[] = [];

  /**
   * Признак занятости модуля
   */
  working = true;

  // eslint-disable-next-line no-unused-vars
  constructor() {
    makeObservable(this, {
      // observable
      subscribes: observable,
      working: observable,
      // action
      saveSubscribes: action,
      setWorking: action,
      // computed
      listSubscribes: computed,
    });
  }

  /**
   * Сохранить reddit-подписки
   * @param subscribes мои подписки
   */
  saveSubscribes = (subscribes: Subscribe[]) => {
    this.subscribes = [];
    subscribes.forEach((subscribe) => {
      this.subscribes.push(new RedditSubscribe(subscribe));
    });
  };

  /**
   * Список подписок
   */
  get listSubscribes() {
    return this.subscribes.map(({ id, over18, title }) => ({
      id,
      over18,
      title,
    }));
  }

  /**
   * Установить признак занятости модуля
   * @param working - признак занятости модуля
   */
  setWorking = (working: boolean) => {
    this.working = working;
  };
}
