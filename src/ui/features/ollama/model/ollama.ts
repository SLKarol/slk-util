import { action, computed, makeObservable, observable } from "mobx";
import { type ModelResponse } from "ollama";
import dayjs from "dayjs";

import { OllamaModelsStore } from "@renderer-features/model/ollama-models";
import { SelectEntitiesStore } from "@renderer-features/model/select-entites";
import { type ModelInfo } from "../lib/types";
import { formatBytes } from "@renderer-shared/lib";

export class OllamaStore {
  /**
   * Список моделей ollama
   */
  ollamaModels: OllamaModelsStore;

  /**
   * Выбранные модели
   */
  selectedModels: SelectEntitiesStore;

  constructor() {
    this.ollamaModels = new OllamaModelsStore();
    this.selectedModels = new SelectEntitiesStore();

    makeObservable(this, {
      // observable
      // action
      // computed
      listInstalledOllamaModels: computed,
    });
  }

  /**
   * Запомнить список моделей
   */
  processOllamaModelListResponse = (listModels: ModelResponse[]) => {
    this.ollamaModels.setOllamaModels(listModels);
  };

  /**
   * Получить список установленных моделей Ollama,
   * со свойствами, которые выбрал юзер
   */
  get listInstalledOllamaModels() {
    const now = dayjs();
    return this.ollamaModels.ollamaModels.map((model) => {
      const target = dayjs(model.expires_at);
      const minutesDiff = target.diff(now, "minute");

      return {
        name: model.name,
        modifiedAt: dayjs(model.modified_at).format("DD.MM.YYYY HH:mm"),
        size: formatBytes(model.size),
        family: model.details.family,
        parameterSize: model.details.parameter_size,
        quantizationLevel: model.details.quantization_level,
        expiresAt:
          minutesDiff <= 0 ? "Выгружена" : `Через ${minutesDiff} минут`,
        sizeVram: formatBytes(model.size_vram ?? 0),
      } as Partial<ModelInfo>;
    });
  }
}
