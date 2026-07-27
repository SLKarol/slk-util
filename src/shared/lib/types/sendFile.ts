export enum SendFileStatus {
  /**
   * Файл отправляется
   */
  SENDING = "sending",
  /**
   * Файл успешно передан
   */
  SENT = "sent",
  /**
   * Ошибка при передачи файла
   */
  ERROR = "error",
}
