import { action, computed, makeObservable, observable } from "mobx";

import {
  BANNED_TAB_NAME,
  ENTER_PAGE_TAB_NAME,
  MAIN_TAB_NAME,
} from "../constants/tabs";

import { type StihiRuRootStore } from "./stihi-ru-root-store";
import { type StihiRuTab } from "./types";

/**
 * Хранилище вкладок для работы с сайтом «Стихи.ру».
 *
 * Управляет списком открытых вкладок, текущей выбранной вкладкой,
 * а также предоставляет методы для переключения и закрытия вкладок.
 */
export class StihiRuTabsStore {
  /**
   * Map открытых вкладок, где ключ — идентификатор вкладки (строка),
   * а значение — объект вкладки с полями id, title и readonly.
   *
   * По умолчанию включает две фиксированные вкладки: "Настройки" и "Главная".
   */
  tabs: Map<string, StihiRuTab> = new Map([
    [
      ENTER_PAGE_TAB_NAME,
      { id: ENTER_PAGE_TAB_NAME, readonly: true, title: "Зайти на страницу" },
    ],
    [
      BANNED_TAB_NAME,
      { id: BANNED_TAB_NAME, readonly: true, title: "Заблокированные" },
    ],
    [MAIN_TAB_NAME, { id: MAIN_TAB_NAME, readonly: true, title: "Главная" }],
  ]);

  /**
   * Идентификатор текущей активной вкладки.
   *
   * @observable
   */
  selectedTab = "main";

  constructor(private stihiRuRootStore: StihiRuRootStore) {
    makeObservable(this, {
      // observable
      selectedTab: observable,
      tabs: observable,
      // action

      setSelectedTab: action,
      // computed
      tabsArray: computed,
    });
  }

  /**
   * Устанавливает активную вкладку по её идентификатору.
   *
   * Если вкладка с указанным `idTab` существует, она становится выбранной.
   *
   * @param idTab - Идентификатор вкладки, которую нужно активировать.
   * @action
   */
  setSelectedTab = (idTab: string) => {
    if (this.tabs.has(idTab)) {
      this.selectedTab = idTab;
    }
  };

  /**
   * Возвращает массив всех вкладок (включая фиксированные и динамические).
   *
   * Используется, например, для отображения списка вкладок в UI.
   *
   * @returns Массив объектов вкладок, отсортированный в порядке добавления.
   *
   * @computed
   */
  get tabsArray() {
    return Array.from(this.tabs.values());
  }
}
