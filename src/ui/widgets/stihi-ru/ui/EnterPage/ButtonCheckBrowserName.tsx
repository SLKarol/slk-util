import { Button, Tooltip } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Кнопка проверки того, что введённое имя файла запущено
 */
export const ButtonCheckBrowserName = observer(() => {
  const {
    stihiRuUiStore: { browserProgramEntered, browserProcessName },
  } = useStihiRuRootStore();

  const onClick = () => {
    window.electronAPI.checkBrowserProgramRun(browserProcessName);
  };

  return (
    <Tooltip label="Ищет среди запущенных процессов имя браузера, которое написано в инпуте. Если находит, то закрывает его.">
      <Button
        variant="filled"
        color="yellow"
        disabled={!browserProgramEntered}
        onClick={onClick}
      >
        Проверка
      </Button>
    </Tooltip>
  );
});
ButtonCheckBrowserName.displayName = "ButtonCheckBrowserName";
