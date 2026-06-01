import { action, makeObservable, observable } from "mobx";

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
  /**
   * Мои подписки
   */
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
   * Установить признак занятости модуля
   * @param working - признак занятости модуля
   */
  setWorking = (working: boolean) => {
    this.working = working;
  };
}
