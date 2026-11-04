import { OllamaUpdateStatus } from "@shared/lib/types/ollama";

/**
 * Возвращает цвет лога в зависимости от статуса обновления Ollama.
 * @param status - Статус обновления Ollama.
 * @returns Цвет лога.
 */
export const getLogColor = (status: OllamaUpdateStatus) => {
  switch (status) {
    case OllamaUpdateStatus.error:
      return "red";
    case OllamaUpdateStatus.success:
      return "teal";
    default:
      return "gray";
  }
};
