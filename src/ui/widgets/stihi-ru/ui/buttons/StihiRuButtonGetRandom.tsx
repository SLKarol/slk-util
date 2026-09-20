import { Button, Tooltip } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Выбрать случайно из списка произведений
 */
export const StihiRuButtonGetRandom = observer(() => {
  const {
    listChaptersStore: { chaptersLoaded, selectRandomChapter },
  } = useStihiRuRootStore();

  return (
    <Tooltip label="Случайный выбор из списка страниц">
      <Button disabled={!chaptersLoaded} onClick={selectRandomChapter}>
        Случайно выбрать
      </Button>
    </Tooltip>
  );
});
StihiRuButtonGetRandom.displayName = "StihiRuButtonGetRandom";
