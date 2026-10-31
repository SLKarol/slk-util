import { Toolbar, Tooltip } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";

import { useOllamaStore } from "@renderer/providers/ollama";

/**
 * Обновить список установленных моделей
 */
export const OllamaToolbarRefresh = () => {
  const {
    selectedModels: { clearSelection },
  } = useOllamaStore();

  const onClick = () => {
    clearSelection();
    window.electronAPI.listInstalledOllamaModels();
  };

  return (
    <Toolbar.Toggle onClick={onClick}>
      <Tooltip label="Обновить список установленных моделей">
        <IconRefresh />
      </Tooltip>
    </Toolbar.Toggle>
  );
};
