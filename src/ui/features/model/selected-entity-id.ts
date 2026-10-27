import { action, computed, makeObservable, observable } from "mobx";

/**
 * Класс для выбора некоей сущности.
 * Тип ключевого поля- строка.
 */
export class SelectedEntityIdStore {
  /** Выбранная сущность */
  selectedEntityId = "";

  constructor() {
    makeObservable(this, {
      // observable
      selectedEntityId: observable,
      // action
      setSelectedEntityId: action,
    });
  }

  /**
   * Установить выбранное значение
   * @param selectedModel - Выбранное значение
   */
  setSelectedEntityId = (selectedEntityId: string) => {
    this.selectedEntityId = selectedEntityId;
  };
}
