import { type IpcMainEvent } from "electron";

/**
 * Класс для отправки логов из основного процесса Electron в процесс рендера.
 */
export class LogMainToRender {
  /**
   * Событие IPC из основного процесса, используемое для отправки сообщений в рендер.
   *
   * @private
   */
  private ipcMainEvent: IpcMainEvent | null = null;

  /**
   * Имя канала по умолчанию для отправки логов.
   *
   * @private
   */
  private defaultChannel: string;

  constructor(defaultChannel: string) {
    this.defaultChannel = defaultChannel;
  }

  /**
   * Устанавливает объект события IPC из основного процесса.
   *
   * Этот объект необходим для вызова метода `reply` и отправки данных обратно в рендер-процесс.
   *
   * @param ipcMainEvent - Объект события IPC
   */
  setIpcMainEvent(ipcMainEvent: IpcMainEvent) {
    this.ipcMainEvent = ipcMainEvent;
  }

  /**
   * Отправляет сообщение с логом в рендер-процесс.
   *
   * Если объект `ipcMainEvent` не установлен, сообщение не будет отправлено.
   * Временная метка генерируется автоматически в формате ISO.
   *
   * @param message - Текст сообщения для логирования.
   * @param channel - Опциональное имя канала. Если не указано, используется канал по умолчанию.
   */
  sendLog(message: string, channel?: string) {
    if (this.ipcMainEvent) {
      const date = new Date().toISOString();
      this.ipcMainEvent.reply(channel ?? this.defaultChannel, {
        date,
        message,
      });
    }
  }
}
