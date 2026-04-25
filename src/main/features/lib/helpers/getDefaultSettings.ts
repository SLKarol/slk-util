import { app } from "electron";

import { SETTINGS_APP } from "@main/shared/lib/constants";

/**
 * Возвращает объект с настройками по умолчанию для приложения.
 *
 * @returns {Object} Объект, содержащий стандартные настройки приложения, расширенные путём к папке для сохранения файлов.
 */
export const getDefaultSettings = () => ({
  ...SETTINGS_APP,
  folderForSaveFiles: app.getPath("downloads"),
});
