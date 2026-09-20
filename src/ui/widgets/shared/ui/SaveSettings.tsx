import { Button } from "@mantine/core";
import { IconDeviceFloppyFilled } from "@tabler/icons-react";

/**
 * Кнопка сохранения настроек
 */
export const SaveSettings = () => {
  return (
    <Button
      rightSection={<IconDeviceFloppyFilled size={14} />}
      type="submit"
      ml="auto"
    >
      Сохранить настройки
    </Button>
  );
};
