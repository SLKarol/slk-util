import { action, computed, makeObservable, observable } from "mobx";

import type { StihiRuRootStore } from "./stihi-ru-root-store";

/**
 * Хранилище для управления списком забаненных авторов на сайте "Стихи.ру".
 */
export class StihiRuBanAuthrorsStore {
  /**
   * Список забаненных авторов
   */
  list: Set<string> = new Set();

  constructor(private stihiRuRootStore: StihiRuRootStore) {
    makeObservable(this, {
      // observable
      list: observable,
      // action
      addOrRemoveBadAuthorByPoemHref: action,
      loadArrayBadAuthors: action,
      // computed
      countBadAuthors: computed,
      haveBadAuthors: computed,
    });
  }

  /**
   * Загрузка списка забаненных авторов из массива
   * @param badAuthors список забаненных авторов
   */
  loadArrayBadAuthors = (badAuthors: string[]) => {
    this.list = new Set(badAuthors);
  };

  /**
   * Проверяет, есть ли забаненные авторы в памяти
   */
  get haveBadAuthors() {
    return this.list.size > 0;
  }

  /**
   * Количество забаненных авторов
   */
  get countBadAuthors() {
    return this.list.size;
  }

  /**
   * Добавляет или удаляет автора из списка забаненных по ссылке на стихотворение.
   * @param poemHref Ссылка на произведение (стихотворение), по которой определяется автор.
   * Если автор уже есть в списке забаненных, он будет удалён. Если его нет, он будет добавлен.
   * После изменения списка, соответствующий автор будет добавлен или удалён из файла с забаненными авторами через IPC-вызов.
   */
  addOrRemoveBadAuthorByPoemHref = (poemHref: string) => {
    const authorId =
      this.stihiRuRootStore.stihiRuPoemsStore.poems.get(poemHref)?.authorId ??
      "";

    if (this.list.has(authorId)) {
      this.list.delete(authorId);
      window.electronAPI.removeBanAuthor(authorId);
    } else {
      this.list.add(authorId);
      window.electronAPI.addBanAuthor(authorId);
    }
  };
}
