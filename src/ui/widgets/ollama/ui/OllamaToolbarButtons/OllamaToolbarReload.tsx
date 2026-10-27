import { Tooltip } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";

/**
 * Обновить из интернет выбранные модели
 */
export const OllamaToolbarReload = () => {
  return (
    <Tooltip label="Обновить из интернет выбранные модели">
      <IconReload />
    </Tooltip>
  );
};
