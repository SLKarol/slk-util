import { action, computed, makeObservable, observable } from "mobx";

import { type ReceiveStatisticBotData } from "@shared/lib/types/electron-api";

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
   * Данные статистики бота.
   */
  statisticBotData: ReceiveStatisticBotData[] = [];

  /**
   * Создаёт экземпляр хранилища трекера.
   */
  constructor() {
    makeObservable(this, {
      // observable
      dateValue: observable,
      isTracking: observable,
      statisticBotData: observable,
      // action
      addStatisticBotData: action,
      clearStatisticBotData: action,
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

  /**
   * Очищает данные статистики бота.
   */
  clearStatisticBotData = () => {
    this.statisticBotData = [];
  };

  /**
   * Добавляет данные статистики бота.
   * @param data статистические данные бота.
   */
  addStatisticBotData = (data: ReceiveStatisticBotData) => {
    this.statisticBotData.push(data);
  };
}
