import { Button, Tooltip } from "@mantine/core";
import { IconDeviceFloppyFilled } from "@tabler/icons-react";

import { useSettingsFormContext } from "../providers/ContextFormSettingsTunnel";

import { getFormValuesforWork } from "./helpers/getFormValuesforWork";

/**
 * Кнопка принудительного сохранения настроек
 */
export const SaveSettings = () => {
  const form = useSettingsFormContext();
  const onClick = () => {
    window.electronAPI.saveTunnelSettings({
      ...getFormValuesforWork(form.getValues()),
      methodExcludeDomainsFromVpn: false,
    });
  };

  return (
    <Tooltip label="Настройки сохраняются по кнопке 'Сформировать'. Это принудительное сохранение">
      <Button
        rightSection={<IconDeviceFloppyFilled size={14} />}
        onClick={onClick}
      >
        Сохранить настройки
      </Button>
    </Tooltip>
  );
};
