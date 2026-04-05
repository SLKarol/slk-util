import { action, computed, makeObservable, observable } from "mobx";

/**
 * Хранилище состояния трекера.
 *
 * Класс `TrackerStore` управляет состоянием трекера,
 * предоставляет действия для его изменения и хранит данные по трекеру.
 */
export class TrackerStihiStore {
  /**
   * Значение даты в виде строки.
   */
  dateValue: string | null = null;

  /**
   * Признак того, что трекер в данный момент работает.
   */
  isTracking = false;

  /**
   * Создаёт экземпляр хранилища трекера.
   */
  constructor() {
    makeObservable(this, {
      // observable
      dateValue: observable,
      isTracking: observable,
      // action
      setDateValue: action,
      startTracking: action,
      stopTracking: action,
      // computed
      dateExists: computed,
    });
  }

  /**
   * Устанавливает новое значение даты.
   */
  setDateValue = (date: string | null) => {
    this.dateValue = date;
  };

  /**
   * Запускает работу трекера.
   */
  startTracking = () => {
    this.isTracking = true;
  };

  /**
   * Останавливает работу трекера.
   */
  stopTracking = () => {
    this.isTracking = false;
  };

  /**
   * Проверяет, существует ли установленная дата.
   */
  get dateExists() {
    return Boolean(this.dateValue);
  }
}
