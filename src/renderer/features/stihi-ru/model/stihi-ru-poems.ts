import { action, makeObservable, observable } from "mobx";

import { type StihiRuRootStore } from "./stihi-ru-root-store";
import { type SihiPoem } from "./types";

/**
 * Хранилище для управления списком стихов на сайте "Стихи.ру".
 */
export class StihiRuPoemsStore {
  /**
   * Список стихов, загруженных с сайта "Стихи.ру" для выбранной главы.
   */
  poems: SihiPoem[] = [];

  /**
   * Флаг, указывающий, находится ли хранилище в состоянии загрузки данных.
   *
   * Используется для управления индикаторами загрузки в интерфейсе.
   *
   * @observable
   */
  loading = false;

  constructor(private stihiRuRootStore: StihiRuRootStore) {
    makeObservable(this, {
      // observable
      poems: observable,
      loading: observable,
      // action
      handlePoemsData: action,
      loadPoems: action,
      // computed
    });
  }

  /**
   * Загружает список стихов для выбранной главы.
   * Устанавливает флаг загрузки в `true` И отправляет запрос на загрузку данных.
   */
  loadPoems = () => {
    const match =
      this.stihiRuRootStore.listChaptersStore.selectedChapter.href.match(
        /\/poems\/list\.html\?.*$/,
      );
    if (!match) return;

    this.stihiRuRootStore.historySelectedPartsStore.pushSelectedDate(
      this.stihiRuRootStore.listChaptersStore.selectedChapter,
    );

    this.loading = true;
    const url = `https://www.stihi.ru${match[0]}`;
    window.electronAPI.fetchText(url);
  };

  /**
   * Задать значение списка стихов, загруженных с сайта "Стихи.ру".
   *
   * Сбрасывает флаг загрузки в `false` и сохраняет полученные данные в `poems`.
   * @param poems - Список стихов, полученный с сайта "Стихи.ру" для выбранной главы.
   */
  handlePoemsData = (poems: SihiPoem[]) => {
    this.loading = false;
    this.poems = poems;
  };
}
