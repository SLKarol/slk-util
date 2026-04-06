import { shell } from "electron";
import { parse } from "node-html-parser";

import { BASE_URL_STIHI_RU } from "../lib/constants";
import { fetchHtml } from "../lib/fetch";

import { getPoemsFromHtmlDoc } from "@shared/lib/helpers/getPoemsFromHtmlDoc";
import { type SihiPoem } from "@shared/lib/types/stihiru.types";

import { VisitPoemsByAuthor } from "./VisitPoemsByAuthor";

/**
 * Произведения из выбранного раздела
 */
export class PoemsInChaper {
  /**
   * Список стихов, загруженных с сайта "Стихи.ру" для выбранной главы.
   */
  poems: Map<string, SihiPoem>;

  /**
   * Список посещенных произведений авторов
   */
  visitPoemsByAuthor: VisitPoemsByAuthor;

  constructor() {
    this.poems = new Map();
    this.visitPoemsByAuthor = new VisitPoemsByAuthor();
  }

  /**
   * Загрузка стихов для выбранной главы. Сохраняет их в поле poems.
   * @param selectChapter - URL выбранной главы.
   */
  async loadPoems(selectChapter: string) {
    const htmlPage = await fetchHtml(`${BASE_URL_STIHI_RU}${selectChapter}`);
    const root = parse(htmlPage);
    const poems = getPoemsFromHtmlDoc(root as unknown as Document);
    poems.forEach((poem) => {
      this.poems.set(poem.href, poem);
    });
  }

  /**
   * Проходит по каждому произведению и открывает его в браузере.
   * После чего добавляет в список посещенных произведений.
   */
  async readPoems() {
    for (const hrefPoem of this.poems.keys()) {
      const poem = this.poems.get(hrefPoem);
      if (!poem || !this.checkPoemForRead(poem)) return;

      await shell.openExternal(`${BASE_URL_STIHI_RU}${poem.href}`);
      await this.visitPoemsByAuthor.addVisitPoem({
        authorId: poem.authorId,
        href: poem.href,
      });
    }
  }

  /**
   * Логика проверки прочитанных произведений.
   * @param poem Проверяемое произведение
   * @returns true - если произведение можно читать.
   */
  private checkPoemForRead({ authorId }: SihiPoem) {
    // Пока такая логика: один автор-одно прочтение.
    if (this.visitPoemsByAuthor.getVisitPoemsByAuthor(authorId)) return false;
    return true;
  }
}
