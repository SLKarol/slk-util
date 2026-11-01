import { observer } from "mobx-react-lite";
import { Toolbar, Tooltip } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";
import { useOllamaStore } from "@renderer/providers/ollama";

/**
 * Обновить из интернет выбранные модели
 */
export const OllamaToolbarReload = observer(() => {
  const {
    selectedModels: { haveCheckedEntities },
    updateSelectedModels,
  } = useOllamaStore();
  return (
    <Toolbar.Toggle
      disabled={!haveCheckedEntities}
      onClick={updateSelectedModels}
    >
      <Tooltip label="Обновить из интернет выбранные модели">
        <IconReload />
      </Tooltip>
    </Toolbar.Toggle>
  );
});
OllamaToolbarReload.displayName = "OllamaToolbarReload";
