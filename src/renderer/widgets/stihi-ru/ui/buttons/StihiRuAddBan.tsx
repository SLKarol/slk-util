import { Button, Tooltip } from "@mantine/core";
import { IconPigOff } from "@tabler/icons-react";

/**
 * Отправка выбранного в бан-лист
 */
export const StihiRuAddBan = () => {
  return (
    <Tooltip label="Сохранить в файл">
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
