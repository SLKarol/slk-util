import { HolidaysStore } from "./holidays";
import { TrackerStihiStore } from "./tracker-stihi-store";

/**
 * Корневой стор приложения
 */
export class RootStore {
  /**
   * Экземпляр стора трекера stihi.ru
   */
  trackerStihiStore: TrackerStihiStore;

  /**
   * Хранилище названий праздников
   */
  holidaysStore: HolidaysStore;

  constructor() {
    this.trackerStihiStore = new TrackerStihiStore();
    this.holidaysStore = new HolidaysStore();
  }
}
