import { action, computed, makeObservable, observable } from "mobx";
import { notifications } from "@mantine/notifications";

import {
  type AppSettingsOllama,
  type AppSettings,
  TemplatePrompt,
} from "@shared/lib/types/app-settings";
import {
  POEM_MY_MIND_PATTERN,
  POEM_PATTERN,
  PROMPT_MY_MIND,
} from "@shared/lib/constants";
import { OllamaResponse } from "@shared/lib/types/ollama";
import { extractTag } from "@renderer-shared/lib";

export class ReactionPoemsStore {
  /** тип реакции */
  typeReview = "simple";

  /** Текст произведения */
  textOfPoem = "";

  /**
   * Идея пользователя об прочитанном
   */
  myIdea = "";

  /**
   * Результат промпта - размышления
   */
  promptResultThought = "";

  /**
   * Результат промпта - основной вывод
   */
  promptResultOutput = "";

  /**
   * Настройки подключения к ollama
   */
  settingsOllama: AppSettingsOllama = {
    host: "",
    model: { holiday: "", reviewOfPoems: "" },
  };

  /**
   * Настройки промптов
   */
  templatesPrompt: TemplatePrompt = {
    holiday: "",
    myMindAboutPoems: "",
    reviewOfNeuroPoems: "",
    reviewOfPoems: "",
    reviewOfPoorPoems: "",
  };

  /**
   * идёт процесс создания отклика?
   */
  generatingReaction = false;

  constructor() {
    makeObservable(this, {
      // observable
      generatingReaction: observable,
      myIdea: observable,
      textOfPoem: observable,
      typeReview: observable,
      promptResultThought: observable,
      promptResultOutput: observable,
      // action
      generateReaction: action,
      setMyIdea: action,
      setTextOfPoem: action,
      setTypeReview: action,
      onResponseOllamaModel: action,
      // computed
      enableGenerateReaction: computed,
      prompt: computed,
    });
  }

  /**
   * Задать новое значение у "Тип реакции"
   * @param typeReview - новое значение у "Тип реакции"
   */
  setTypeReview = (typeReview: string) => {
    this.typeReview = typeReview;
  };

  /**
   * Задать новое значение у "Текст произведения"
   * @param textOfPoem Новое значение у "Текст произведения"
   */
  setTextOfPoem = (textOfPoem: string) => {
    this.textOfPoem = textOfPoem;
  };

  /**
   * Задать новое значение у "Моя мысль"
   * @param myIdea Новое значение у "Моя мысль по всему прочитанному тексту"
   */
  setMyIdea = (myIdea: string) => {
    this.myIdea = myIdea;
  };

  /**
   * Можно ли генерировать отклик?
   */
  get enableGenerateReaction() {
    return !this.generatingReaction && this.textOfPoem.trim().length > 0;
  }

  /**
   * Обработчик настрек приложения
   * @param param0 Настройки приложения
   */
  onReceiveSetting = ({ ollama, templatesPrompts }: AppSettings) => {
    this.settingsOllama = { ...ollama };
    this.templatesPrompt = { ...templatesPrompts };
  };

  /**
   * Запуск промпта получить текст отклика
   */
  generateReaction = () => {
    if (
      this.settingsOllama.host.length === 0 ||
      this.settingsOllama.model.reviewOfPoems.length === 0
    )
      return notifications.show({
        message: "Не заданы настройки ollama!",
        color: "red",
      });

    if (
      this.myIdea.length > 0 &&
      this.templatesPrompt.myMindAboutPoems.length === 0
    )
      return notifications.show({
        message: "Не задан промпт для описания идеи!",
        color: "red",
      });

    if (
      this.templatesPrompt.reviewOfPoems.length === 0 ||
      this.templatesPrompt.reviewOfNeuroPoems.length === 0
    )
      return notifications.show({
        message: "Не задан промпт!",
        color: "red",
      });

    this.generatingReaction = true;
    this.promptResultThought = "";
    this.promptResultOutput = "";

    window.electronAPI.receiveOllamaModel({
      idPrompt: "reactionPoems",
      model: this.settingsOllama.model.reviewOfPoems,
      prompt: this.prompt,
    });
  };

  /**
   * Обработчик ответа ollama
   * @param param0 ответ ollama
   */
  onResponseOllamaModel = ({ idPrompt, response }: OllamaResponse) => {
    if (idPrompt !== "reactionPoems") return;

    this.generatingReaction = false;
    this.promptResultThought =
      extractTag({ tag: "thought", text: response }) ?? "";
    this.promptResultOutput = `#reaction\n${extractTag({ tag: "output", text: response })}`;
  };

  /**
   * Сконструированный промп.
   * Поскольку я его ещё буду в буфер обмена копировать, пусть будет как computed
   */
  get prompt() {
    // Поскольку пока выбор из двух опций, то обойдусь тренарником
    const mainPrompt =
      this.typeReview === "simple"
        ? this.templatesPrompt.reviewOfPoems
        : this.templatesPrompt.reviewOfNeuroPoems;
    let prompt = mainPrompt.replace(POEM_PATTERN, this.textOfPoem);

    if (this.myIdea.trim().length > 0) {
      prompt = prompt
        .replace(PROMPT_MY_MIND, this.templatesPrompt.myMindAboutPoems)
        .replace(POEM_MY_MIND_PATTERN, this.myIdea);
    }

    return prompt;
  }
}
