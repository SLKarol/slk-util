import { Button, Tooltip } from "@mantine/core";
import { IconPigOff } from "@tabler/icons-react";

/**
 * Отправка выбранного в бан-лист
 */
export const StihiRuAddBan = () => {
  return (
    <Tooltip label="В бан-лист">
      <Button
        variant="filled"
        color="red"
        leftSection={<IconPigOff size={14} />}
      >
        В бан-лист
      </Button>
    </Tooltip>
  );
};
