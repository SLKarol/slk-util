import { action, computed, makeObservable, observable } from "mobx";
import { type ModelResponse } from "ollama";

import { OllamaModelsStore } from "@renderer-features/model/ollama-models";

export class OllamaStore {
  /**
   * Список моделей ollama
   */
  ollamaModels: OllamaModelsStore;

  constructor() {
    this.ollamaModels = new OllamaModelsStore();

    makeObservable(this, {
      // observable
      // action
      // computed
    });
  }

  /**
   * Запомнить список моделей
   */
  processOllamaModelListResponse = (listModels: ModelResponse[]) => {
    this.ollamaModels.setOllamaModels(listModels);
  };
}
