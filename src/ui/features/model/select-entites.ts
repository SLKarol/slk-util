import { action, makeObservable, observable, computed } from "mobx";

/**
 * Хранилище для управления выбранными сущностями.
 */
export class SelectEntitiesStore {
  /**
   * Набор идентификаторов выбранных сущностей.
   */
  selectedEntities: Set<string> = new Set();

  constructor() {
    makeObservable(this, {
      // observable
      selectedEntities: observable,
      // action
      toggleEntity: action,
      setSelectedEntities: action,
      clearSelection: action,
      haveCheckedEntities: computed,
    });
  }

  /**
   * Переключает выбор сущности по её идентификатору.
   * @param entityId - Идентификатор сущности
   */
  toggleEntity = (entityId: string) => {
    if (!entityId) return;

    if (this.selectedEntities.has(entityId)) {
      this.selectedEntities.delete(entityId);
    } else {
      this.selectedEntities.add(entityId);
    }
  };

  /**
   * Устанавливает выбранные сущности по массиву идентификаторов.
   * @param entityIds - Массив идентификаторов сущностей
   */
  setSelectedEntities = (entityIds: string[]) => {
    this.selectedEntities.clear();
    entityIds.forEach((entityId) => this.selectedEntities.add(entityId));
  };

  /**
   * Очищает список выбранных сущностей.
   */
  clearSelection = () => {
    this.selectedEntities.clear();
  };

  /**
   * Есть выбранные сущности?
   * @returns true, если есть хотя бы один выбранный сущность, иначе false
   */
  get haveCheckedEntities() {
    return this.selectedEntities.size > 0;
  }
}
