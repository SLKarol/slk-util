import { useEffect, useState } from "react";

/**
 * Хук для управления настройками пути сохранения файлов в интерфейсе.
 *
 * @returns {Object} Объект, содержащий:
 * - `folderSavePath` — текущий путь к папке для сохранения файлов;
 * - `onClickChangeFolder` — функция для изменения директории через диалоговое окно Electron.
 *
 * @remarks
 * Хук использует состояние для хранения пути к папке и подписывается на события получения настроек из основного процесса.
 * При монтировании компонента запрашивает актуальные настройки. Автоматически очищает подписку при размонтировании.
 */
export const useInputFolderSettings = () => {
  const [folderSavePath, setFolderSavePath] = useState("");

  useEffect(() => {
    window.electronAPI.fetchSettings();

    const unsubscribe = window.electronAPI.onReceiveSetting((settings) => {
      setFolderSavePath(settings.folderForSaveFiles);
    });
    return unsubscribe;
  }, []);

  /**
   * Обработчик нажатия для изменения директории сохранения видео.
   * Вызывает IPC-событие, которое открывает диалог выбора папки в Electron.
   */
  const onClickChangeFolder = () => {
    window.electronAPI.changeSaveVideoDirectory();
  };

  return { onClickChangeFolder, folderSavePath };
};
