import { action, makeObservable, observable } from "mobx";

import { SendFileStatus } from "@shared/lib/types/sendFile";

export class MediaSendWatch {
  /**
   * Список файлов, которые отправляются в телеграм
   */
  telegramSendFileStatus: Map<string, SendFileStatus> = new Map();

  constructor() {
    makeObservable(this, {
      telegramSendFileStatus: observable,
      setFileStatus: action,
    });
  }

  /**
   * Изменить статус файла
   */
  setFileStatus = ({ id, status }: { id: string; status: SendFileStatus }) => {
    const oldStatus = this.telegramSendFileStatus.get(id);
    if (
      [SendFileStatus.ERROR, SendFileStatus.SENT].includes(status) &&
      oldStatus
    ) {
      return this.telegramSendFileStatus.delete(id);
    }

    this.telegramSendFileStatus.set(id, status);
  };
}
