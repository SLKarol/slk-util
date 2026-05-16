import { ActionIcon, Tooltip } from "@mantine/core";
import { IconFolderBolt } from "@tabler/icons-react";

/**
 * Настройка каталога кэширования данных / Кнопка очистки
 */

export const ClearFolderCache = () => {
  return (
    <Tooltip label="Очистить каталог">
      <ActionIcon
        variant="filled"
        onClick={window.electronAPI.clearCacheFolder}
      >
        <IconFolderBolt />
      </ActionIcon>
    </Tooltip>
  );
};
