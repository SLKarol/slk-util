import { shell } from "electron";
import { parse } from "node-html-parser";

import { BASE_URL_STIHI_RU } from "../lib/constants";
import { fetchHtml } from "../lib/helpers/fetch";

import { getPoemsFromHtmlDoc } from "@shared/lib/helpers/getPoemsFromHtmlDoc";
import { randomInt } from "@shared/lib/helpers/randomInt";
import { waitRandom } from "@shared/lib/helpers/wait";
import { type SihiPoem } from "@shared/lib/types/stihiru.types";

import { type LoadPoemsPayload } from "./PoemsInChapter.types";
import { VisitPoemsByAuthor } from "./VisitPoemsByAuthor";

/**
 * Произведения из выбранного раздела
 */
export class PoemsInChaper {
  /**
   * Список стихов, загруженных с сайта "Стихи.ру" для выбранной главы.
   */
  private poems: Map<string, SihiPoem>;

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
  async loadPoems({ selectChapter, signal }: LoadPoemsPayload) {
    const htmlPage = await fetchHtml(`${BASE_URL_STIHI_RU}${selectChapter}`, {
      signal,
    });
    const root = parse(htmlPage);
    const poems = getPoemsFromHtmlDoc(root as unknown as Document);
    poems.forEach((poem) => {
      this.poems.set(poem.href, poem);
    });
  }

  /**
   * Проходит по каждому произведению и открывает его в браузере.
   * После чего добавляет в список посещенных произведений.
   * @param hrefPoems Ссылки на произведения
   */
  async readPoems(hrefPoems: string[]) {
    for (const hrefPoem of hrefPoems) {
      const poem = this.poems.get(hrefPoem);
      if (!poem || !this.checkPoemForRead(poem)) return;

      await shell.openExternal(`${BASE_URL_STIHI_RU}${poem.href}`);
      await this.visitPoemsByAuthor.addVisitPoem({
        authorId: poem.authorId,
        href: poem.href,
      });
      const randomTime = randomInt(3, 5);
      await waitRandom({
        randomTime,
        unit: "s",
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

  /**
   * Очищает список стихов.
   */
  clearPoems() {
    this.poems.clear();
  }

  /**
   * Количество стихов в списке.
   */
  get countPoems() {
    return this.poems.size;
  }

  /**
   * Возвращает массив href стихов, которые не следует читать.
   *
   * Отбирает стихи, для которых `checkPoemForRead` возвращает `false`.
   *
   * @returns Массив строк-ключей (href) стихов, предназначенных для чтения.
   */
  filterPoems(): string[] {
    return Array.from(this.poems.entries())
      .filter(([_, poem]) => this.checkPoemForRead(poem))
      .map(([key]) => key);
  }
}
