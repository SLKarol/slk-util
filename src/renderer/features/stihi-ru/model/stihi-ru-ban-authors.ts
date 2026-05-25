import { notifications } from "@mantine/notifications";
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
      addAuthor: action,
      removeAuthor: action,
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

  /**
   * Добавляет автора в список забаненных
   * @param author login автора
   */
  addAuthor = (author: string) => {
    const authorId = this.extractStihiAuthorId(author);
    if (!authorId) return;

    if (this.list.has(authorId)) {
      notifications.show({ message: `Автор ${authorId} уже есть в списке` });
    } else {
      this.list.add(authorId);
      window.electronAPI.addBanAuthor(authorId);
    }
  };

  /**
   * Получить id автора по ссылке на его страницу, либо же по его строке
   * @param input URL, либо строка с id
   */
  private extractStihiAuthorId = (input: string) => {
    if (!input || typeof input !== "string") return null;

    // Если это просто авторИд (нет протокола)
    if (!input.includes("://") && !input.startsWith("//")) {
      return input.replace(/^\/+|\/+$/g, "");
    }

    // Если это URL — извлекаем авторИд
    try {
      const cleanUrl = input.replace(/\/+$/, "");
      const match = cleanUrl.match(/\/avtor\/([^/?#]+)/i);
      return match?.[1] || null;
    } catch (e) {
      return null;
    }
  };

  /**
   * Удаляет автора из списка забаненных
   * @param author login автора
   */
  removeAuthor = (author: string) => {
    if (!this.list.has(author)) {
      notifications.show({ message: `Автор ${author} не найден в списке` });
    } else {
      this.list.delete(author);
      window.electronAPI.removeBanAuthor(author);
    }
  };
}
