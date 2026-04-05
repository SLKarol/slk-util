import { action, computed, makeObservable, observable } from "mobx";

import { type SihiChapter } from "@shared/lib/types/stihi.types";

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
  chapters: SihiChapter[] = [];

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
      handleChaptersData: action,
      loadChapters: action,
      selectRandomChapter: action,
      setSelectedLinkIndex: action,
      // computed
      haveSelectedChapter: computed,
      selectedChapter: computed,
    });
  }

  /**
   * Загружает список глав для текущей выбранной даты.
   *
   * Очищает предыдущий список глав, устанавливает флаг загрузки в `true`,
   * затем инициирует запрос к API Electron для получения HTML-данных по сгенерированному URL.
   */
  loadChapters = () => {
    this.chapters = [];
    this.loading = true;
    if (this.stihiRuRootStore.calendarStore.selectedDate)
      window.electronAPI.fetchText(
        generateUrlStihiListForDate(
          this.stihiRuRootStore.calendarStore.selectedDate,
        ),
      );
  };

  /**
   * Устанавливает индекс выбранной главы.
   *
   * Если передано `undefined`, сбрасывает выбор. Если индекс уже выбран — снимает выбор.
   * В противном случае устанавливает новый индекс.
   *
   * @param {string | undefined} selectedLinkIndex - Индекс выбранной главы в виде строки или `undefined`.
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
   * Проверяет, были ли загружены главы.
   *
   * @returns {boolean} `true`, если список глав не пустой, иначе — `false`.
   *
   * @computed
   */
  get chaptersLoaded() {
    return this.chapters.length > 0;
  }

  /**
   * Выбирает случайную главу из загруженного списка.
   *
   * Устанавливает `selectedLinkIndex` в случайное значение в допустимом диапазоне.
   *
   * @returns {void}
   *
   * @action
   */
  selectRandomChapter = () => {
    const randomIndex = Math.floor(Math.random() * this.chapters.length);

    this.selectedLinkIndex = randomIndex;
  };

  /**
   * Сбрасывает выбор текущей главы.
   *
   * Устанавливает `selectedLinkIndex` в `null`.
   *
   * @action
   */
  clearSelectedLinkIndex = () => {
    this.selectedLinkIndex = null;
  };

  /**
   * Обрабатывает полученные данные о главах и сохраняет их в хранилище.
   *
   * Сбрасывает флаг загрузки после успешного сохранения.
   *
   * @param {SihiChapter[]} сhaptersData - Массив объектов глав, полученных от парсера.
   * @action
   */
  handleChaptersData = (сhaptersData: SihiChapter[]) => {
    this.chapters = сhaptersData;
    this.loading = false;
  };

  /**
   * Проверяет, выбрана ли какая-либо глава.
   *
   * @returns {boolean} `true`, если `selectedLinkIndex` не `null`, иначе — `false`.
   *
   * @computed
   */
  get haveSelectedChapter() {
    return this.selectedLinkIndex !== null;
  }

  /**
   * Возвращает объект выбранной главы или `null`, если ничего не выбрано.
   *
   * @returns {SihiChapter | null} Объект главы или `null`.
   *
   * @computed
   */
  get selectedChapter() {
    if (this.selectedLinkIndex === null) return null;
    return this.chapters[this.selectedLinkIndex];
  }
}
