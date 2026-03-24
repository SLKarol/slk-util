import { StihiRuCalendarStore } from "./calendar";
import { HistorySelectedPartsStore } from "./history-selected-parts";
import { StihiRuListChapersStore } from "./list-chapters";
import { StihiRuLoginStore } from "./stihi-ru-login";
import { StihiRuPoemsStore } from "./stihi-ru-poems";
import { StihiRuTabsStore } from "./stihi-ru-tabs";

/**
 * Корневое хранилище приложения для управления состоянием на сайте "Стихи.ру".
 *
 * Класс `StihiRuRootStore` служит центральным контейнером для всех подхранилищ,
 * связанных с функциональностью календаря и списков глав стихов.
 * Обеспечивает иерархическую структуру состояния и передаёт ссылку на себя
 * при создании дочерних хранилищ, позволяя им взаимодействовать друг с другом.
 */
export class StihiRuRootStore {
  /**
   * Экземпляр хранилища календаря.
   *
   * Управляет состоянием, связанным с выбором даты пользователем.
   *
   * @see StihiRuCalendarStore
   */
  calendarStore: StihiRuCalendarStore;

  /**
   * Экземпляр хранилища списков глав (групп стихов).
   *
   * Отвечает за загрузку и хранение списка групп стихов, доступных по выбранной дате.
   *
   * @see StihiRuListChapersStore
   */

  listChaptersStore: StihiRuListChapersStore;

  /**
   * Экземпляр хранилища стихов.
   */
  stihiRuPoemsStore: StihiRuPoemsStore;

  /**
   * Экземпляр хранилища истории выбранных разделов.
   */
  historySelectedPartsStore: HistorySelectedPartsStore;

  /**
   * Экземпляр хранилища вкладок.
   */
  stihiRuTabsStore: StihiRuTabsStore;

  /**
   * Экземпляр хранилища авторизации.
   */
  stihiRuLoginStore: StihiRuLoginStore;

  /**
   * Создаёт экземпляр корневого хранилища.
   */
  constructor() {
    /**
     * Экземпляр хранилища календаря.
     *
     * Управляет состоянием, связанным с выбором даты пользователем.
     *
     * @see StihiRuCalendarStore
     */
    this.calendarStore = new StihiRuCalendarStore(this);
    this.listChaptersStore = new StihiRuListChapersStore(this);
    this.stihiRuPoemsStore = new StihiRuPoemsStore(this);
    this.historySelectedPartsStore = new HistorySelectedPartsStore(this);
    this.stihiRuTabsStore = new StihiRuTabsStore(this);
    this.stihiRuLoginStore = new StihiRuLoginStore();
  }
}
