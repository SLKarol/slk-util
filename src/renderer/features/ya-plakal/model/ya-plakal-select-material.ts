import { action, makeObservable, observable } from "mobx";

/**
 * Хранилище для управления выбранным материалом на сайте "Я Плакал".
 */
export class SelectMaterialStore {
  /**
   * Флаг, указывающий, находится ли хранилище в состоянии обработки.
   *
   * Используется для управления индикаторами работы в интерфейсе.
   *
   * @observable
   */
  working = false;

  /**
   * URL заметки, введенный пользователем.
   *
   * @observable
   */
  url = "";

  constructor() {
    makeObservable(this, {
      // observable
      working: observable,
      url: observable,
      // action
      setWorking: action,
      setUrl: action,
    });
  }

  /**
   * Устанавливает значение флага работы.
   * @param value - Новое значение флага работы
   */
  setWorking = (value: boolean) => {
    this.working = value;
  };

  /**
   * Устанавливает значение введенного URL.
   * @param value - Новое значение URL
   */
  setUrl = (value: string) => {
    this.url = value;
  };
}
