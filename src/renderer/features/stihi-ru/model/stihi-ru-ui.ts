import { action, makeObservable, observable } from "mobx";

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

  constructor() {
    makeObservable(this, {
      // observable
      openWithInvite: observable,
      // action
      toggleOpenWithInvite: action,
      // computed
    });
  }

  /**
   * Переключить состояние открытия включая приглашения.
   */
  toggleOpenWithInvite = () => {
    this.openWithInvite = !this.openWithInvite;
  };
}
