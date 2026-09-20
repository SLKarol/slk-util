import { Button, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
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
    if (!dateExists)
      return notifications.show({
        title: "Ошибка",
        message: "Не выбрана дата",
        color: "red",
      });

    if (!browserProgramEntered)
      return notifications.show({
        title: "Ошибка",
        message: "Не выбран браузер",
        color: "red",
      });

    if (dateValue) window.electronAPI.startStihiAutoRead(dateValue);
  };

  return (
    <Tooltip label="Запустить процесс открытия произведений. Пригласить так сказать.">
      <Button onClick={onClick} disabled={isTracking}>
        Запустить
      </Button>
    </Tooltip>
  );
});
ButtonRunEnter.displayName = "ButtonRunEnter";
