/**
 * Параметры для запроса к ИИ-мо.
 */
export interface OllamaAskProps {
  /**
   * id промпта
   */
  idPrompt: string;
  /**
   * Ollama модель для запроса. Например, 'llama2' или 'gpt-4'.
   */
  model: string;
  /**
   * Предложение для запроса. Например, 'Как дела?' или 'Что нового?'.
   */
  prompt: string;
}

/**
 * Ответ модели из ollama
 */
export interface OllamaResponse {
  /** id промпта **/
  idPrompt: string;
  /** ответ модели **/
  response: string;
}

/**
 * Статусы обновления моделей Ollama
 */
export enum OllamaUpdateStatus {
  /** информационное сообщение */
  info = "info",
  /** успешное завершение */
  success = "success",
  /** ошибка */
  error = "error",
  /** данные процесса */
  data = "data",
}

/**
 * Строка лога обновления модели Ollama
 */
export interface OllamaUpdateRecordLog {
  /**
   * Какая модель обновляется
   */
  model: string;
  /**
   * Статус обновления модели
   */
  status?: string;
  /**
   * Сколько слоев уже загружено
   */
  completed?: number;
  /**
   * Общее количество слоев
   */
  total?: number;

  /**
   * Процент завершения обновления модели (0-100)
   */
  percent?: number;

  /**
   * Дата и время события в формате ISO
   */
  dateTime: string;

  /**
   * Статус обновления модели (success, error, data)
   */
  level: OllamaUpdateStatus;

  /**
   * Информационное сообщение о процессе обновления модели
   */
  message?: string;
}
