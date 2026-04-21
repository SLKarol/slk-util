import { action, makeObservable, observable } from "mobx";

import { type HasPrevNextPage } from "@shared/lib/types/htmlPageInfo";

/**
 * Хранилище данных для пагинации
 */
export class MediaPagerStore implements HasPrevNextPage {
  current = 0;
  next = false;
  prev = false;

  constructor() {
    makeObservable(this, {
      // observable
      current: observable,
      next: observable,
      prev: observable,
      // action
      setPagerValues: action,
    });
  }

  /**
   * Установить значения для всего стора
   */
  setPagerValues = (newValues: HasPrevNextPage) => {
    this.current = newValues.current;
    this.next = newValues.next;
    this.prev = newValues.prev;
  };
}
