import { ActionIcon, Tooltip } from "@mantine/core";
import { IconEraser } from "@tabler/icons-react";

export const YaButtonClearSelected = () => {
  return (
    <Tooltip label="Очистить выбранное">
      <ActionIcon variant="filled">
        <IconEraser />
      </ActionIcon>
    </Tooltip>
  );
};
