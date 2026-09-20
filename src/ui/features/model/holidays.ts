import { makeAutoObservable } from "mobx";

import { randomInt } from "@shared/lib/helpers/randomInt";

/**
 * Стор, хранящий список праздников и работу с ними.
 *
 */
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

  /**
   * Писать о празднике при помощи ИИ
   */
  shouldWriteAboutHolidayWithAI = false;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Получить список праздников.
   *
   * @param values - Массив названий праздников для загрузки.
   */
  loadHolydays = (holidays: string[]) => {
    this.holidays.length = 0;
    this.holidays = [...holidays];
    const max = this.holidays.length;
    this.indxRandom = max > 0 ? randomInt(0, max - 1) : -1;
  };

  /**
   * Название выбранного праздника
   */
  get selectedHoliday() {
    return this.indxRandom > -1 ? this.holidays[this.indxRandom] : "";
  }

  /**
   * Изменить случайный праздник.
   */
  changeRandomHolyday = () => {
    const max = this.holidays.length;
    this.indxRandom = max > 0 ? randomInt(0, max - 1) : -1;
  };

  /**
   * Переключить флаг отправки названия праздника.
   */
  toggleSendHolidayName = () => {
    this.sendHolidayName = !this.sendHolidayName;
    if (!this.sendHolidayName) this.shouldWriteAboutHolidayWithAI = false;
  };

  /**
   * Установить значение флага для записи о празднике при помощи ИИ.
   *
   * @param shouldWriteAboutHolidayWithAI - Новое значение флага.
   */
  setShouldWriteAboutHolidayWithAI = (
    shouldWriteAboutHolidayWithAI: boolean,
  ) => {
    this.shouldWriteAboutHolidayWithAI = shouldWriteAboutHolidayWithAI;
  };
}
