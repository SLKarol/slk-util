import { makeAutoObservable } from "mobx";

import { randomInt } from "@shared/lib/helpers/randomInt";

export class HolidaysStore {
  /**
   * Список праздников
   */
  holidays = [] as string[];

  /**
   * Индекс случайной записи
   */
  indxRandom = -1;

  /**
   * Флаг, указывающий, что нужно отправлять название праздника
   */
  sendHolidayName = true;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Получить список праздников
   */
  loadHolydays = (values: string[]) => {
    this.holidays.length = 0;
    this.holidays = [...values];
    const max = this.holidays.length;
    this.indxRandom = max > 0 ? randomInt(0, max - 1) : -1;
  };

  /**
   * Название выбранного праздника
   */
  get selectedHoliday() {
    return this.indxRandom > -1 ? this.holidays[this.indxRandom] : "";
  }

  changeRandomHolyday = () => {
    const max = this.holidays.length;
    this.indxRandom = max > 0 ? randomInt(0, max - 1) : -1;
  };

  toggleSendHolidayName = () => {
    this.sendHolidayName = !this.sendHolidayName;
  };
}
