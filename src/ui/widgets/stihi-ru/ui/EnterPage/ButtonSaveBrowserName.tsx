import { Button } from "@mantine/core";
import { IconDeviceFloppyFilled } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Кнопка сохранить имя браузера
 */
export const ButtonSaveBrowserName = observer(() => {
  const {
    stihiRuUiStore: { browserProgramEntered, browserProcessName },
  } = useStihiRuRootStore();

  const onClick = () => {
    window.electronAPI.saveSetting({
      key: "browserProcessName",
      settings: browserProcessName,
    });
  };

  return (
    <Button
      variant="filled"
      color="green"
      rightSection={<IconDeviceFloppyFilled size={14} />}
      disabled={!browserProgramEntered}
      onClick={onClick}
    >
      Сохранить
    </Button>
  );
});
ButtonSaveBrowserName.displayName = "ButtonSaveBrowserName";
