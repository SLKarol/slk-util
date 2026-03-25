import { action, makeObservable, observable } from "mobx";

/**
 * Хранилище для управления списком забаненных авторов на сайте "Стихи.ру".
 */
export class StihiRuBanAuthrorsStore {
  /**
   * Список забаненных авторов
   */
  list: Set<string> = new Set();

  constructor() {
    makeObservable(this, {
      // observable
      list: observable,
      // action
      loadArrayBadAuthors: action,
      // computed
    });
  }

  /**
   * Загрузка списка забаненных авторов из массива
   * @param badAuthors список забаненных авторов
   */
  loadArrayBadAuthors = (badAuthors: string[]) => {
    this.list = new Set(badAuthors);
  };
}
