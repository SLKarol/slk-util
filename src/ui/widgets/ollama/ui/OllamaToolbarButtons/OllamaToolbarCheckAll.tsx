import { Tooltip } from "@mantine/core";
import { IconSelectAll } from "@tabler/icons-react";

/**
 * Выбрать всё
 */
export const OllamaToolbarCheckAll = () => {
  return (
    <Tooltip label="Выбрать всё из списка моделей">
      <IconSelectAll />
    </Tooltip>
  );
};
