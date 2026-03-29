import { Button, Tooltip } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Кнопка "Открыть все в броузере"
 */
export const ListVerseButtonOpenAll = observer(() => {
  const {
    stihiRuPoemsStore: { linkAllPoems },
  } = useStihiRuRootStore();

  const onClick = () => {
    window.electronAPI.stihiOpenAllPoems(linkAllPoems);
  };

  return (
    <Tooltip label="Открыть в броузере">
      <Button variant="light" color="cyan" onClick={onClick}>
        Открыть всё
      </Button>
    </Tooltip>
  );
});
ListVerseButtonOpenAll.displayName = "ListVerseButtonOpenAll";
