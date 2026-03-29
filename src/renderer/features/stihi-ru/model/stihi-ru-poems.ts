import { action, computed, makeObservable, observable } from "mobx";

import { sortPoemsDescData } from "../lib/sortPoem";

import { type StihiRuRootStore } from "./stihi-ru-root-store";
import { type SihiPoem } from "./types";

/**
 * Хранилище для управления списком стихов на сайте "Стихи.ру".
 */
export class StihiRuPoemsStore {
  /**
   * Список стихов, загруженных с сайта "Стихи.ру" для выбранной главы.
   */
  poems: Map<string, SihiPoem> = new Map();

  /**
   * Флаг, указывающий, находится ли хранилище в состоянии загрузки данных.
   *
   * Используется для управления индикаторами загрузки в интерфейсе.
   *
   * @observable
   */
  loading = false;
  /**
   * Признак показа забаненных авторов.
   *
   * @observable
   */
  showBanned = false;

  constructor(private stihiRuRootStore: StihiRuRootStore) {
    makeObservable(this, {
      // observable
      loading: observable,
      poems: observable,
      showBanned: observable,
      // action
      handlePoemsData: action,
      loadPoems: action,
      toggleShowBanned: action,
      clearPoems: action,
      // computed
      invites: computed,
      hasPoems: computed,
      newPoems: computed,
      linkAllPoems: computed,
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
    this.poems.clear();
    poems.forEach((poem) => {
      this.poems.set(poem.href, poem);
    });
  };

  /**
   * Возвращает массив ссылок стихотворений, у которых установлен флаг `invite`.
   *
   * @returns {SihiPoem[]} Массив стихотворений, помеченных как приглашения.
   */
  get invites() {
    const poemHrefs = [] as string[];

    if (this.showBanned) {
      this.poems.values().forEach(({ href, invite }) => {
        if (invite) {
          poemHrefs.push(href);
        }
      });
      return poemHrefs;
    }

    this.poems.forEach(({ authorId, invite, href }) => {
      if (
        invite &&
        !this.stihiRuRootStore.stihiRuBanAuthrorsStore.list.has(authorId)
      )
        poemHrefs.push(href);
    });

    return poemHrefs;
  }

  /**
   * Возвращает массив ссылок новых стихотворений, отсортированных по дате в порядке убывания.
   * Стихотворения без флага приглашения (и забаненных авторов) исключаются .
   * Про авторов - это в this.showBanned.
   * @returns {SihiPoem[]} Отсортированный массив стихотворений без флага приглашения.
   */
  get newPoems() {
    const poemsArray = Array.from(this.poems.values());

    if (this.showBanned) {
      return poemsArray
        .filter(({ invite }) => !invite)
        .toSorted(sortPoemsDescData)
        .map((p) => p.href);
    }

    return poemsArray
      .filter(
        ({ invite, authorId }) =>
          !invite &&
          !this.stihiRuRootStore.stihiRuBanAuthrorsStore.list.has(authorId),
      )
      .toSorted(sortPoemsDescData)
      .map((p) => p.href);
  }

  /**
   * Проверяет, есть ли в списке стихотворений хотя бы одно стихотворение.
   */
  get hasPoems() {
    return this.poems.size > 0;
  }

  /**
   * Переключает значение свойства `showBanned`.
   */
  toggleShowBanned = () => {
    this.showBanned = !this.showBanned;
  };

  /**
   * Очищает список стихотворений.
   */
  clearPoems = () => {
    this.poems.clear();
  };

  /**
   * Возвращает массив ссылок видимых стихотворений.
   * Если `openWithInvite` включен, возвращает все стихотворения (приглашения + новые).
   */
  get linkAllPoems() {
    if (this.stihiRuRootStore.stihiRuUiStore.openWithInvite)
      return [...this.invites, ...this.newPoems];
    return this.newPoems;
  }
}
