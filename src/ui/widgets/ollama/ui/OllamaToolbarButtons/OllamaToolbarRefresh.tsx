import { Toolbar, Tooltip } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";

/**
 * Обновить список установленных моделей
 */
export const OllamaToolbarRefresh = () => {
  return (
    <Toolbar.Toggle onClick={window.electronAPI.listInstalledOllamaModels}>
      <Tooltip label="Обновить список установленных моделей">
        <IconRefresh />
      </Tooltip>
    </Toolbar.Toggle>
  );
};
