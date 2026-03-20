import { action, computed, makeObservable, observable } from "mobx";

import { generateUrlStihiListForDate } from "@renderer-features/stihi-ru/lib/generateUrlStihiListForDate";

import type { StihiRuRootStore } from "./stihi-ru-root-store";

/**
 * Хранилище для управления списком глав (групп стихов) на сайте "Стихи.ру".
 *
 * Класс `StihiRuListChapersStore` отвечает за загрузку и хранение списка глав,
 * доступных по выбранной дате из календаря. Поддерживает состояние загрузки.
 */
export class StihiRuListChapersStore {
  /**
   * Список текстовых обозначений глав (например, "1-5", "6-10"), загруженных с сайта.
   *
   * @observable
   */
  chapters: string[] = [];

  /**
   * Флаг, указывающий, находится ли хранилище в состоянии загрузки данных.
   *
   * Используется для управления индикаторами загрузки в интерфейсе.
   *
   * @observable
   */
  loading = false;

  /**
   * Выбранный раздел. Индекс в массиве
   */
  selectedLinkIndex: null | number = null;

  /**
   * Ссылка на корневое хранилище приложения.
   *
   * Используется для доступа к другим частям хранилища MobX при необходимости.
   */
  private stihiRuRootStore: StihiRuRootStore;

  constructor(stihiRuRootStore: StihiRuRootStore) {
    this.stihiRuRootStore = stihiRuRootStore;

    makeObservable(this, {
      // observable
      chapters: observable,
      loading: observable,
      selectedLinkIndex: observable,
      // action
      clearSelectedLinkIndex: action,
      loadChapters: action,
      setSelectedLinkIndex: action,
      selectRandomChapter: action,
      handleChaptersData: action,
      // computed
      arrayLinks: computed,
    });
  }

  /**
   * Загружает список глав для текущей даты.
   * Ставит флаг загрузки. Очищает текущий список глав. Запрашивает данные с сайта.
   */
  loadChapters = () => {
    this.chapters = [];
    this.loading = true;
    window.electronAPI.fetchText(
      generateUrlStihiListForDate(
        this.stihiRuRootStore.calendarStore.selectedDate,
      ),
    );
  };

  /**
   * Возвращает массив ссылок на разделы стихов, сгенерированных из текущего списка глав.
   */
  get arrayLinks() {
    const urlSelectedDate = generateUrlStihiListForDate(
      this.stihiRuRootStore.calendarStore.selectedDate ?? "",
    );

    return this.chapters.map((chap) => {
      const baseLink = chap.split("-")[0];
      return { caption: chap, link: `${urlSelectedDate}&start=${baseLink}` };
    });
  }

  /**
   * Задает выбранный раздел
   */
  setSelectedLinkIndex = (selectedLinkIndex: string | undefined) => {
    if (!selectedLinkIndex) {
      this.selectedLinkIndex = null;
      return;
    }

    const indexInArrayLinks = Number.parseInt(selectedLinkIndex, 10);

    if (typeof this.selectedLinkIndex === "number") {
      if (this.selectedLinkIndex !== indexInArrayLinks) {
        this.selectedLinkIndex = indexInArrayLinks;
      } else this.selectedLinkIndex = null;
    } else this.selectedLinkIndex = indexInArrayLinks;
  };

  /**
   * Загружены ли разделы.
   */
  get chaptersLoaded() {
    return this.chapters.length > 0;
  }

  /**
   * Выбрать случайный раздел
   */
  selectRandomChapter = () => {
    const randomIndex = Math.floor(Math.random() * this.chapters.length);

    this.selectedLinkIndex = randomIndex;
  };

  /**
   * Очистить выбранный раздел
   */
  clearSelectedLinkIndex = () => {
    this.selectedLinkIndex = null;
  };

  /**
   * Сохранить в стор список глав
   * @param сhaptersData массив глав
   */
  handleChaptersData = (сhaptersData: string[]) => {
    this.chapters = сhaptersData;
    this.loading = false;
  };
}
