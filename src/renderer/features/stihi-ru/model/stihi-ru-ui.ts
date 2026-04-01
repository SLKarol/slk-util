import { action, computed, makeObservable, observable } from "mobx";

/**
 * Хранилище всякого для работы с UI.
 *
 * Управляет списком открытых вкладок, текущей выбранной вкладкой,
 * а также предоставляет методы для переключения и закрытия вкладок.
 */
export class StihiRuUiStore {
  /**
   * открыть включая приглашения?
   *
   * @observable
   */
  openWithInvite = true;

  /**
   * Имя процесса браузера. Как правило это chrome.exe
   */
  browserProcessName = "";

  constructor() {
    makeObservable(this, {
      // observable
      browserProcessName: observable,
      openWithInvite: observable,
      // action
      setBrowserProcessName: action,
      toggleOpenWithInvite: action,
      // computed
      browserProgramEntered: computed,
    });
  }

  /**
   * Переключить состояние открытия включая приглашения.
   */
  toggleOpenWithInvite = () => {
    this.openWithInvite = !this.openWithInvite;
  };

  /**
   * Изменить имя процесса браузера.
   * @param browserProcessName новое имя процесса браузера
   */
  setBrowserProcessName = (browserProcessName: string) => {
    this.browserProcessName = browserProcessName;
  };

  /**
   * Браузерный процесс был введен?
   */
  get browserProgramEntered() {
    return (
      typeof this.browserProcessName === "string" &&
      this.browserProcessName.length > 0
    );
  }
}
