import { Button, Tooltip } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Кнопка запуска процесса открытия произведений.
 */
export const ButtonRunEnter = observer(() => {
  const {
    stihiRuUiStore: { browserProgramEntered },
  } = useStihiRuRootStore();

  const onClick = () => {
    console.log(window.electronAPI);
  };

  return (
    <Tooltip label="Запустить процесс открытия произведений. Пригласить так сказать.">
      <Button onClick={onClick} disabled={!browserProgramEntered}>
        Запустить
      </Button>
    </Tooltip>
  );
});
ButtonRunEnter.displayName = "ButtonRunEnter";
