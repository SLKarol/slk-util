import { Button, Tooltip } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";
import { useRootStore } from "@renderer/providers/useRootStore";

/**
 * Кнопка запуска процесса открытия произведений.
 */
export const ButtonRunEnter = observer(() => {
  const {
    stihiRuUiStore: { browserProgramEntered },
  } = useStihiRuRootStore();
  const {
    trackerStihiStore: { dateExists, dateValue, isTracking },
  } = useRootStore();

  const onClick = () => {
    if (dateValue) window.electronAPI.startStihiAutoRead(dateValue);
  };

  return (
    <Tooltip label="Запустить процесс открытия произведений. Пригласить так сказать.">
      <Button
        onClick={onClick}
        disabled={isTracking || !browserProgramEntered || !dateExists}
      >
        Запустить
      </Button>
    </Tooltip>
  );
});
ButtonRunEnter.displayName = "ButtonRunEnter";
