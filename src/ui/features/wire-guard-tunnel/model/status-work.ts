import { action, makeObservable, observable } from "mobx";

/**
 * Хранилище состояния работы.
 */
export class StatusStore {
  /**
   * Признак того, что сейчас идёт работа.
   */
  isWorking: boolean;

  constructor() {
    this.isWorking = false;

    makeObservable(this, {
      // observable
      isWorking: observable,
      // action
      setWorking: action,
      setIdle: action,
    });
  }

  /**
   * Установить статус "занят"
   */
  setWorking = () => {
    this.isWorking = true;
  };

  /**
   * Установить статус "в ожидании"
   */
  setIdle = () => {
    this.isWorking = false;
  };
}
