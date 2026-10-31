import { Toolbar, Tooltip } from "@mantine/core";
import { useOllamaStore } from "@renderer/providers/ollama";
import { IconSelectAll } from "@tabler/icons-react";

/**
 * Выбрать всё
 */
export const OllamaToolbarCheckAll = () => {
  const { checkAllModels } = useOllamaStore();

  return (
    <Toolbar.Toggle onClick={checkAllModels}>
      <Tooltip label="Выбрать всё из списка моделей">
        <IconSelectAll />
      </Tooltip>
    </Toolbar.Toggle>
  );
};
