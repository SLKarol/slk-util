import { TrackerStihiStore } from "./tracker-stihi-store";

/**
 * Корневой стор приложения
 */
export class RootStore {
  /**
   * Экземпляр стора трекера stihi.ru
   */
  trackerStihiStore: TrackerStihiStore;

  constructor() {
    this.trackerStihiStore = new TrackerStihiStore();
  }
}
