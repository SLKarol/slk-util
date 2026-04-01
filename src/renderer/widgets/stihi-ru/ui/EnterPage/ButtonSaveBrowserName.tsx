import { Button } from "@mantine/core";
import { IconDeviceFloppyFilled } from "@tabler/icons-react";

/**
 * Кнопка сохранить имя браузера
 */
export const ButtonSaveBrowserName = () => {
  return (
    <Button
      variant="filled"
      color="green"
      rightSection={<IconDeviceFloppyFilled size={14} />}
    >
      Сохранить
    </Button>
  );
};
