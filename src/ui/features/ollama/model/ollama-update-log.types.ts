import { type OllamaUpdateStatus } from "@shared/lib/types/ollama";

/**
 * Экземпляр записи лога обновления.
 */
export interface LogEntry {
  /**
   * Уникальный идентификатор записи.
   */
  id: string;

  /**
   * Время создания записи.
   */
  time: string;

  /**
   * Статус обновления.
   */
  status: OllamaUpdateStatus;

  /**
   * Название модели.
   */
  model: string;

  /**
   * Сообщение обновления.
   */
  message: string;
}
