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

  /** Выбранная модель */
  selectedModel = "";

  constructor() {
    makeObservable(this, {
      // observable
      ollamaModels: observable,
      selectedModel: observable,
      // action
      setOllamaModels: action,
      setSelectedModel: action,
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
   * Установить выбранную модель
   * @param selectedModel - Выбранная юзером модель
   */
  setSelectedModel = (selectedModel: string) => {
    this.selectedModel = selectedModel;
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
