import { Button, Tooltip } from "@mantine/core";

/**
 * Настройка каталога кэширования данных / Кнопка изменения
 */
export const ChangeFolderCache = () => {
  return (
    <Tooltip label="Выбрать другой каталог">
      <Button onClick={window.electronAPI.changeCacheFolder}>Изменить</Button>
    </Tooltip>
  );
};
