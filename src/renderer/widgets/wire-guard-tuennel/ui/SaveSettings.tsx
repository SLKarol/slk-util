import { Button, Tooltip } from "@mantine/core";
import { IconDeviceFloppyFilled } from "@tabler/icons-react";

/**
 * Кнопка принудительного сохранения настроек
 */
export const SaveSettings = () => {
  return (
    <Tooltip label="Настройки сохраняются по кнопке 'Сформировать', это принудительное сохранение">
      <Button rightSection={<IconDeviceFloppyFilled size={14} />} disabled>
        Сохранить настройки
      </Button>
    </Tooltip>
  );
};
