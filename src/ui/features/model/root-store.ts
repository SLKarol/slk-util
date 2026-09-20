import { HolidaysStore } from "./holidays";
import { MediaSendWatch } from "./media-send-watch";
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

  /** Отслеживание статуса отправки файлов */
  mediaSendWatch: MediaSendWatch;

  constructor() {
    this.trackerStihiStore = new TrackerStihiStore();
    this.holidaysStore = new HolidaysStore();
    this.mediaSendWatch = new MediaSendWatch();
  }
}
