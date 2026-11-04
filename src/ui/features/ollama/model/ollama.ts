import { action, computed, makeObservable, observable } from "mobx";
import { type ModelResponse } from "ollama";
import dayjs from "dayjs";

import { OllamaModelsStore } from "@renderer-features/model/ollama-models";
import { SelectEntitiesStore } from "@renderer-features/model/select-entites";
import { type ModelInfo } from "../lib/types";
import { formatBytes } from "@renderer-shared/lib";
import { OllamaUpdateLogsStore } from "./ollama-update-log";

export class OllamaStore {
  /**
   * Список моделей ollama
   */
  ollamaModels: OllamaModelsStore;

  /**
   * Выбранные модели
   */
  selectedModels: SelectEntitiesStore;

  /**
   * Лог обновления моделей Ollama
   */
  ollamaUpdateLogs: OllamaUpdateLogsStore;

  constructor() {
    this.ollamaModels = new OllamaModelsStore();
    this.selectedModels = new SelectEntitiesStore();
    this.ollamaUpdateLogs = new OllamaUpdateLogsStore();

    makeObservable(this, {
      // observable
      // action
      checkAllModels: action,
      onCheckModel: action,
      updateSelectedModels: action,
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
        name: model.model,
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

  /**
   * Отметить все установленные модели
   */
  checkAllModels = () => {
    const listModels = this.ollamaModels.ollamaModels.map(
      (model) => model.model,
    );
    this.selectedModels.setSelectedEntities(listModels);
  };

  /**
   * Обновить выбранные модели  
   */
  updateSelectedModels = () => {
    const modelsToUpdate: Set<string> = new Set();

    // Перебираем выбранные модели и определяем, какие из них нужно обновить
    this.selectedModels.selectedEntities.forEach((modelName) => {
      const model = this.ollamaModels.ollamaModels.find(
        (m) => m.model === modelName,
      );
      if (!model) return;

      const parentModel = model.details.parent_model;
      //Если родительская модель пустая, то можно просто обновить
      if (!parentModel) {
        modelsToUpdate.add(model.model);
        return;
      }

      // Если есть некая родительская модель и она не из числа установленных, то тоже её обновляем
      if (
        parentModel &&
        !this.ollamaModels.ollamaModels.find((m) => m.model === parentModel)
      ) {
        modelsToUpdate.add(model.name);
        return;
      }
    });

    this.ollamaUpdateLogs.startUpdating();
    window.electronAPI.ollamaUpdateModels(Array.from(modelsToUpdate));
  };

  onCheckModel = (modelName: string) => {
    const clickedModel = this.ollamaModels.ollamaModels.find(
      (m) => m.model === modelName,
    );
    if (!clickedModel) return;

    /**
     * Если у модели есть родительская модель,
     * то запомнить её и найти точно такие же модели,
     * которые имеют ту же родительскую модель, и отметить их все.
     */
    const parentModel = clickedModel.details.parent_model;

    /**
     * Модели, у которых точно такой же родитель
     */
    const modelsWithSameParent = this.ollamaModels.ollamaModels.reduce(
      (acc: string[], model) => {
        // Модели, у которых точно такой же родитель
        if (parentModel && model.details.parent_model === parentModel) {
          acc.push(model.model);
          return acc;
        }

        // Модели, чьих он родитель
        if (!parentModel && model.details.parent_model === clickedModel.model) {
          acc.push(model.model);
          return acc;
        }

        // Модель, кто родитель
        if (model.model === parentModel) {
          acc.push(model.model);
          return acc;
        }

        return acc;
      },
      [],
    );
    if (!modelsWithSameParent.includes(modelName))
      modelsWithSameParent.push(modelName);

    modelsWithSameParent.forEach((modelName) => {
      this.selectedModels.toggleEntity(modelName);
    });
  };
}
