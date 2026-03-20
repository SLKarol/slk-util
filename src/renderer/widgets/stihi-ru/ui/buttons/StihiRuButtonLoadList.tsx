import { Button, Tooltip } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Загрузить список произведений
 */
export const StihiRuButtonLoadList = observer(() => {
  const {
    calendarStore: { dateSelected },
    listChaptersStore: { clearSelectedLinkIndex, loading, loadChapters },
  } = useStihiRuRootStore();

  return (
    <Tooltip label="Загрузить группы по дням">
      <Button
        variant="filled"
        disabled={!dateSelected || loading}
        onClick={() => {
          clearSelectedLinkIndex();
          loadChapters();
        }}
      >
        Загрузить
      </Button>
    </Tooltip>
  );
});
StihiRuButtonLoadList.displayName = "StihiRuButtonLoadList";
