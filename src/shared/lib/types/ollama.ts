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
  /** ответ мрдели **/
  response: string;
}
