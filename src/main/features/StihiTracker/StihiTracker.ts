import { exec } from "child_process";
import { parse } from "node-html-parser";

import { fetchHtml } from "../lib/fetch";
import { UserDataFileManager } from "../UserDataFileManager";

import { generateUrlStihiListForDate } from "@shared/lib/helpers/generateUrlStihiListForDate";
import { getGroupPoemsFromHtmlString } from "@shared/lib/helpers/getGroupPoemsFromHtmlString";
import { waitRandom } from "@shared/lib/helpers/wait";
import { type AppSettings } from "@shared/lib/types/app-settings";

import { PoemsInChaper } from "./PoemsInChaper";
import { RandomSectionPicker } from "./RandomSectionPicker";

/**
 * Основной класс трекера стихов.
 *
 * Управляет жизненным циклом трекинга: запуск, работа, остановка.
 */
export class StihiTracker {
  /**
   * Экземпляр класса для случайного выбора глав, исключая посещённые.
   *
   * Инкапсулирует логику выбора, хранения и фильтрации глав.
   *
   * @private
   */
  private randomSectionPicker: RandomSectionPicker;

  /**
   * Список произведений в выбранной части
   */
  private poemsInChaper: PoemsInChaper;

  /**
   * Дата публикации произведений.
   *
   * Хранит значение в формате строки (например, "YYYY-MM-DD").
   * Если трекинг не активен — `null`.
   *
   * @private
   */
  private trackerDay: string | null = null;

  /**
   * Контроллер для отмены асинхронных операций, связанных с трекингом.
   *
   * Используется, например, для прерывания HTTP-запросов или таймеров при остановке трекера.
   *
   * @private
   */
  private abortController: AbortController;

  /**
   * Файловый менеджер для работы с настройками приложения.
   */
  private settingsFileManager: UserDataFileManager<AppSettings>;

  constructor() {
    this.randomSectionPicker = new RandomSectionPicker();
    this.abortController = new AbortController();
    this.poemsInChaper = new PoemsInChaper();
    this.settingsFileManager = new UserDataFileManager<AppSettings>(
      "settings.json",
      {
        stihiRu: { login: "", password: "", cookies: [] },
        browserProcessName: "",
      },
    );
  }

  /**
   * Запускает трекинг на указанную дату.
   * @param date - Дата в формате строки (например, "2023-10-05").
   */
  async startTrack(date: string) {
    this.trackerDay = date;
    const { browserProcessName } = await this.settingsFileManager.readData();

    const htmlPage = await fetchHtml(generateUrlStihiListForDate(date), {
      signal: this.abortController.signal,
    });
    const root = parse(htmlPage);
    const chaptersData = getGroupPoemsFromHtmlString(
      root as unknown as Document,
    );
    this.randomSectionPicker.setChapters(chaptersData);

    const selectChapter = this.randomSectionPicker.selectRandomChapter();
    if (!selectChapter) return;
    await this.poemsInChaper.loadPoems({
      selectChapter,
      signal: this.abortController.signal,
    });
    await this.poemsInChaper.readPoems();
    exec(`chcp 65001 && taskkill /im ${browserProcessName} /f`);
    await waitRandom({
      max: 20,
      min: 15,
      signal: this.abortController.signal,
      unit: "m",
    });
  }

  /**
   * Возвращает текущую дату трекинга, если она установлена.
   *
   * Геттер позволяет безопасно получить состояние трекера.
   *
   * @returns Строка с датой (в формате "YYYY-MM-DD") или `null`, если трекинг не запущен.
   */
  get existTrackerDay() {
    return this.trackerDay;
  }

  /**
   * Останавливает трекинг и сбрасывает всё связанное состояние.
   *
   * Выполняет следующие действия:
   * - очищает дату трекинга;
   * - сбрасывает выбранный раздел в `RandomSectionPicker`;
   * - удаляет информацию о посещённых главах;
   * - очищает список доступных глав;
   * - инициирует отмену всех асинхронных операций.
   */
  stopTrack() {
    this.trackerDay = null;
    this.randomSectionPicker.clearSelectChapter();
    this.randomSectionPicker.clearVisitedChapters();
    this.randomSectionPicker.clearChapters();
    this.poemsInChaper.clearPoems();
    this.abortController.abort();
  }
}
