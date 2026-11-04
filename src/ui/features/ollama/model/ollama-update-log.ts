import { action, computed, observable, makeObservable } from "mobx";

import { type LogEntry } from "./ollama-update-log.types";
import {
  type OllamaUpdateRecordLog,
  OllamaUpdateStatus,
} from "@shared/lib/types/ollama";
import { formatBytes } from "@renderer-shared/lib";

export class OllamaUpdateLogsStore {
  /**
   * Лог обновления модели Ollama
   */
  logs: LogEntry[] = [];

  /**
   * Флаг, указывающий, что процесс обновления модели Ollama активен
   */
  isUpdating: boolean = false;

  /**
   * Сет для отслеживания выведенных этапов
   */
  loggedMilestones = new Set<string>();

  constructor() {
    makeObservable(this, {
      // observable
      logs: observable,
      isUpdating: observable,
      // action
      startUpdating: action,
      stopUpdating: action,
      processIncomingLog: action,
    });
  }

  /**
   * Начать процесс обновления модели Ollama
   */
  startUpdating = () => {
    this.isUpdating = true;
    this.logs = [];
    this.loggedMilestones.clear();
  };

  /**
   * Завершить процесс обновления модели Ollama
   */
  stopUpdating = () => {
    this.isUpdating = false;
    this.addLog({
      message: "Процесс обновления завершен.",
      model: "",
      status: OllamaUpdateStatus.info,
    });
  };

  /**
   * Обработка входящего лога обновления модели Ollama
   */
  processIncomingLog = ({
    dateTime,
    level,
    model,
    completed,
    message,
    percent,
    status,
    total,
  }: OllamaUpdateRecordLog) => {
    if (!status) return;

    // 1. Ошибки
    if (level === OllamaUpdateStatus.error) {
      // return this.addLog("error", model, `Ошибка: ${status}`);
    }

    // 2. Успешное завершение
    if (level === OllamaUpdateStatus.success) {
      // return this.addLog("success", model, `Успешно обновлена!`);
    }

    // 3. Системные этапы
    if (status === "pulling manifest")
      return this.addLog({
        message: `Получение манифеста...`,
        model,
        status: OllamaUpdateStatus.info,
      });
    if (status === "verifying sha256 digest")
      return this.addLog({
        message: `Проверка целостности...`,
        model,
        status: OllamaUpdateStatus.info,
      });
    if (status === "writing manifest")
      return this.addLog({
        message: `Сохранение...`,
        model,
        status: OllamaUpdateStatus.info,
      });

    // 4. Загрузка слоев
    if (status.startsWith("pulling ") && status !== "pulling manifest") {
      const hash = status.split(" ")[1];
      const shortHash = hash.substring(0, 8);

      if (!total || total === 0) {
        const startKey = `start-${hash}`;
        if (!this.loggedMilestones.has(startKey)) {
          this.loggedMilestones.add(startKey);
          this.addLog({
            message: `Начало загрузки слоя ${shortHash}...`,
            model,
            status: OllamaUpdateStatus.info,
          });
        }
        return;
      }

      if (typeof percent !== "number") return;

      const milestone = Math.floor((percent ?? 0) / 25) * 25;
      const logKey = `layer-${hash}-${milestone}`;

      if (percent === 100 && !this.loggedMilestones.has(`done-${hash}`)) {
        this.loggedMilestones.add(`done-${hash}`);
        this.addLog({
          message: `Слой ${shortHash} скачан (${formatBytes(total)})`,
          model,
          status: OllamaUpdateStatus.success,
        });
      } else if (
        !this.loggedMilestones.has(logKey) &&
        percent > 0 &&
        percent < 100
      ) {
        this.loggedMilestones.add(logKey);
        this.addLog({
          message: `Слой ${shortHash}: ${milestone}% (${formatBytes(
            completed ?? 0,
          )} / ${formatBytes(total)})`,
          model,
          status: OllamaUpdateStatus.info,
        });
      }
    }
  };

  /**
   * Добавление записи в лог обновления модели Ollama
   */
  private addLog({
    message,
    model,
    status,
  }: {
    status: OllamaUpdateStatus;
    model: string;
    message: string;
  }) {
    const now = new Date();
    const time = now.toLocaleTimeString("ru-RU", { hour12: false });

    this.logs.push({
      id: Date.now().toString() + Math.random(),
      time,
      status,
      model,
      message,
    });

    // Ограничиваем лог, чтобы не сожрать память при долгой работе
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-500);
    }
  }
}
