import { SihiChapter } from "@shared/lib/types/stihi.types";

import { type StihiChapters } from "./RandomSectionPicker.types";

/**
 * Класс для выбора случайного элемента из списка глав, исключая уже посещённые.
 *
 * Управляет списком доступных глав, отслеживает посещённые разделы
 * и позволяет выбирать случайные непосещённые элементы.
 */
export class RandomSectionPicker {
  /**
   * Ключ выбранного раздела произведений.
   */
  private selectedChapter: string | null;

  /**
   * Список текстовых обозначений глав (например, "1-5", "6-10"), загруженных с сайта.
   * И ссылок на них
   */
  chapters: StihiChapters = new Map();

  /**
   * Список посещённых дат для каждого блока.
   * Используется для исключения уже посещённых блоков при выборе случайного элемента.
   * Хранит уникальные идентификаторы глав (ссылки) в виде множества для быстрого доступа.
   */
  private visitedChapters: Set<string> = new Set();

  constructor() {
    this.selectedChapter = null;
  }

  /**
   * Добавляет блок в трекер
   * @param chapterId Уникальный идентификатор главы
   */
  addChapter = (chapterId: string) => {
    if (!this.visitedChapters.has(chapterId)) {
      this.visitedChapters.add(chapterId);
    }
  };

  /**
   * Выбирает случайный элемент из доступных
   * Исключает уже посещённые.
   * @returns Ключ случайного элемента или null, если все посещены
   */
  selectRandomChapter(): string | null {
    // Получаем ключи (ссылки) из this.chapters
    let keys = Array.from(this.chapters.keys());

    keys = keys.filter((key) => !this.visitedChapters.has(key));

    if (keys.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * keys.length);
    const selectedChapter = keys[randomIndex];
    this.selectedChapter = selectedChapter;
    this.visitedChapters.add(selectedChapter);
    return selectedChapter;
  }

  /**
   * Возвращает ключ выбранного элемента
   * @returns Ключ или null
   */
  getSelectedChapter(): string | null {
    return this.selectedChapter;
  }

  /**
   * Очищает выбор главы
   */
  clearSelectChapter(): void {
    this.selectedChapter = null;
  }

  /**
   * Заполняет список глав на основе массива объектов `SihiChapter`.
   *
   * Очищает предыдущие данные и заполняет `chapters` новыми значениями.
   *
   * @param chapters - Массив объектов, представляющих главы с сайта.
   */
  setChapters(chapters: SihiChapter[]): void {
    this.chapters.clear();
    chapters.forEach((chapter) => {
      this.chapters.set(chapter.href, chapter.textContent);
    });
  }

  /**
   * Очищает список посещённых глав.
   */
  clearVisitedChapters() {
    this.visitedChapters.clear();
  }

  /**
   * Очищает список всех глав.
   * Удаляет все доступные главы из `chapters`. Не влияет на список посещённых.
   */
  clearChapters() {
    this.chapters.clear();
  }
}
