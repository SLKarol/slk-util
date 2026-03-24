import { action, computed, makeObservable, observable } from "mobx";

import type { StihiRuRootStore } from "./stihi-ru-root-store";
import { type SihiChapter } from "./types";

/**
 * Хранилище выбранных дат (разделов) истории на сайте "Стихи.ру".
 *
 * Управляет списком выбранных пользователем глав (дат) в интерфейсе просмотра истории.
 * Использует MobX для реактивности состояния.
 */
export class HistorySelectedPartsStore {
  /**
   * Список выбранных глав (дат), отображаемых в истории.
   *
   * Каждая глава представляет собой объект типа `SihiChapter`, содержащий,
   * например, дату и соответствующий URL-путь.
   *
   * @observable
   */
  selectedDates: SihiChapter[] = [];

  /**
   * Ссылка на корневое хранилище приложения.
   *
   * Используется для доступа к другим частям хранилища MobX при необходимости.
   */
  private stihiRuRootStore: StihiRuRootStore;

  /**
   * Создаёт экземпляр хранилища выбранных частей истории.
   *
   * @param {StihiRuRootStore} stihiRuRootStore - Корневое хранилище приложения.
   */
  constructor(stihiRuRootStore: StihiRuRootStore) {
    this.stihiRuRootStore = stihiRuRootStore;

    makeObservable(this, {
      // observable
      selectedDates: observable,
      // action
      pushSelectedDate: action,
      // computed
      selectedDatesReverse: computed,
    });
  }

  /**
   * Добавляет новую главу в список выбранных дат.
   *
   * @param {SihiChapter} sihiChapter - Глава, которую нужно добавить.
   */
  pushSelectedDate = (sihiChapter: SihiChapter) => {
    this.selectedDates.push(sihiChapter);
  };

  /**
   * Возвращает копию списка выбранных дат в обратном порядке.
   *
   * Полезно для отображения последних выбранных элементов вверху списка.
   *
   * @returns {SihiChapter[]} Массив выбранных глав в обратном порядке.
   */
  get selectedDatesReverse() {
    return this.selectedDates.slice().reverse();
  }
}
