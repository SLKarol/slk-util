import { Tooltip } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";

/**
 * Обновить список установленных моделей
 */
export const OllamaToolbarRefresh = () => {
  return (
    <Tooltip label="Обновить список установленных моделей">
      <IconRefresh />
    </Tooltip>
  );
};
