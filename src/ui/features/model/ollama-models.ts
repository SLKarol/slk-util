import { action, computed, makeObservable, observable } from "mobx";
import { type ModelResponse } from "ollama";

/**
 * Модели ollama
 */
export class OllamaModelsStore {
  /**
   * Список моделей ollama
   */
  ollamaModels: ModelResponse[] = [];

  constructor() {
    makeObservable(this, {
      // observable
      ollamaModels: observable,
      // action
      setOllamaModels: action,
      // computed
      ollamaModelsUi: computed,
    });
  }

  /**
   * Установить список моделей ollama
   * @param ollamaModels - Список моделей ollama
   */
  setOllamaModels = (ollamaModels: ModelResponse[]) => {
    this.ollamaModels = ollamaModels;
  };

  /**
   * Список моделей для вывода их в UI
   */
  get ollamaModelsUi() {
    return this.ollamaModels.map((ollamaModel) => ({
      value: ollamaModel.name,
      label: ollamaModel.name,
    }));
  }
}
