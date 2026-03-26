import { action, computed, makeObservable, observable } from "mobx";

import type { StihiRuRootStore } from "./stihi-ru-root-store";

/**
 * Хранилище состояния календаря для работы с датами на сайте "Стихи.ру".
 *
 * Класс `StihiRuCalendarStore` управляет выбранным состоянием даты,
 * предоставляет действия для её изменения и вычисляемые свойства,
 * определяющие, выбрана ли дата.
 */
export class StihiRuCalendarStore {
  /**
   * Текущая выбранная дата в виде строки (например, '2023-10-05') или `null`, если дата не выбрана.
   */
  selectedDate: string | null = null;

  /**
   * Ссылка на корневое хранилище приложения.
   *
   * Используется для доступа к другим частям хранилища MobX при необходимости.
   */
  private stihiRuRootStore: StihiRuRootStore;

  /**
   * Создаёт экземпляр хранилища календаря.
   *
   * @param {StihiRuRootStore} stihiRuRootStore - Корневое хранилище приложения, передаваемое через конструктор.
   */
  constructor(stihiRuRootStore: StihiRuRootStore) {
    this.stihiRuRootStore = stihiRuRootStore;

    makeObservable(this, {
      // observable
      selectedDate: observable,
      // action
      setSelectedDate: action,
      // computed
      dateSelected: computed,
      referer: computed,
    });
  }

  /**
   * Устанавливает новую выбранную дату.
   */
  setSelectedDate = (newDate: string) => {
    this.selectedDate = newDate;
  };

  /**
   * Вычисляемое свойство, указывающее, выбрана ли какая-либо дата.
   */
  get dateSelected() {
    return Boolean(this.selectedDate);
  }

  /**
   * Ссылка на страницу с выбранной датой.
   */
  get referer() {
    if (this.dateSelected) {
      const date = new Date(this.selectedDate);

      return `/poems/list.html?topic=all&year=${date.getFullYear()}&month=${String(date.getMonth() + 1).padStart(2, "0")}&day=${date.getDate().toString().padStart(2, "0")}`;
    }
    return null;
  }
}
