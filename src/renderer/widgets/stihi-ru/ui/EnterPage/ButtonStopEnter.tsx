import { Button, Tooltip } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useRootStore } from "@renderer/providers/useRootStore";

/**
 * Кнопка останова процесса открытия произведений.
 */
export const ButtonStopEnter = observer(() => {
  const {
    trackerStihiStore: { isTracking },
  } = useRootStore();

  const onClick = () => {
    window.electronAPI.stopStihiAutoRead();
  };

  return (
    <Tooltip label="Остановить бота, который открывает произведения">
      <Button onClick={onClick} disabled={!isTracking}>
        Остановить бота
      </Button>
    </Tooltip>
  );
});
ButtonStopEnter.displayName = "ButtonStopEnter";
