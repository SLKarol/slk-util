import { action, makeObservable, observable } from "mobx";

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
}
