import { Toolbar, Tooltip } from "@mantine/core";
import { IconSelectAll } from "@tabler/icons-react";

/**
 * Выбрать всё
 */
export const OllamaToolbarCheckAll = () => {
  return (
    <Toolbar.Toggle>
      <Tooltip label="Выбрать всё из списка моделей">
        <IconSelectAll />
      </Tooltip>
    </Toolbar.Toggle>
  );
};
OllamaToolbarCheckAll.displayName = "OllamaToolbarCheckAll";
