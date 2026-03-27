import { action, computed, makeObservable, observable } from "mobx";

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
      countBadAuthors: computed,
      haveBadAuthors: computed,
    });
  }

  /**
   * Загрузка списка забаненных авторов из массива
   * @param badAuthors список забаненных авторов
   */
  loadArrayBadAuthors = (badAuthors: string[]) => {
    this.list = new Set(badAuthors);
  };

  /**
   * Проверяет, есть ли забаненные авторы в памяти
   */
  get haveBadAuthors() {
    return this.list.size > 0;
  }

  /**
   * Количество забаненных авторов
   */
  get countBadAuthors() {
    return this.list.size;
  }
}
