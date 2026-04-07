import { UserDataFileManager } from "../UserDataFileManager";

import {
  type AddVisitPoemPayload,
  type MapVisitPoemsByAuthor,
  type VisitPoemsByAuthorData,
} from "./VisitPoemsByAuthor.types";

/**
 * Класс для хранения информации о посещенных произведениях по автору
 */
export class VisitPoemsByAuthor {
  mapVisitPoemsByAuthor: MapVisitPoemsByAuthor = new Map();

  /**
   * Список посещенных авторов
   */
  private trackerVisitAuthors: UserDataFileManager;

  constructor() {
    this.trackerVisitAuthors = new UserDataFileManager(
      "trackerVisitAuthors.json",
      [],
    );
    this.trackerVisitAuthors.readDataAsJSON().then((jsonString) => {
      this.mapVisitPoemsByAuthor = this.fromJson(jsonString);
    });
  }

  /**
   * Импортирует mapVisitPoemsByAuthor из JSON
   * @param json - JSON строка, созданная методом toJson
   */
  private fromJson(json: string) {
    if (typeof json !== "string" || json.trim() === "") {
      throw new TypeError("Expected a non-empty string");
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      throw new SyntaxError("Invalid JSON format");
    }

    if (!Array.isArray(parsed)) {
      throw new TypeError("Expected JSON array of [key, value] pairs");
    }

    const result = new Map<string, VisitPoemsByAuthorData[]>();

    for (const entry of parsed) {
      if (!Array.isArray(entry) || entry.length !== 2) {
        throw new TypeError("Each entry must be a [key, value] array");
      }

      const [key, value] = entry as [unknown, unknown];

      if (typeof key !== "string") {
        throw new TypeError(
          `Invalid key type: expected string, got ${typeof key}`,
        );
      }

      // 🔹 Новое: значение должно быть массивом
      if (!Array.isArray(value)) {
        throw new TypeError(`Value for key "${key}" must be an array`);
      }

      // 🔹 Новое: валидация каждого элемента массива
      const validatedArray: VisitPoemsByAuthorData[] = [];
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        if (
          typeof item !== "object" ||
          item === null ||
          typeof (item as Record<string, unknown>).href !== "string" ||
          typeof (item as Record<string, unknown>).dateTime !== "string"
        ) {
          throw new TypeError(
            `Invalid item at index ${i} for key "${key}": expected VisitPoemsByAuthorData shape`,
          );
        }
        validatedArray.push(item as VisitPoemsByAuthorData);
      }

      result.set(key, validatedArray);
    }

    return result;
  }

  /**
   * Запоминает посещение произведения в памяти и записывает в файл
   * @param param0
   */
  async addVisitPoem({ authorId, href }: AddVisitPoemPayload) {
    let authorStatistics = this.mapVisitPoemsByAuthor.get(authorId);
    if (!authorStatistics) {
      authorStatistics = [];
    }

    authorStatistics.push({ dateTime: new Date().toISOString(), href });

    this.mapVisitPoemsByAuthor.set(authorId, authorStatistics);

    await this.trackerVisitAuthors.writeData(
      Array.from(this.mapVisitPoemsByAuthor.entries()),
      true,
    );
  }

  /**
   * Отдает список посещенных произведений по автору
   */
  getVisitPoemsByAuthor(authorId: string) {
    return this.mapVisitPoemsByAuthor.get(authorId);
  }
}
