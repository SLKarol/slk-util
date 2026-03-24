import { Button } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Загрузить выбранный список произведений
 */
export const StihiRuButtonLoadSelected = observer(() => {
  const {
    listChaptersStore: { haveSelectedChapter },
    stihiRuPoemsStore: { loadPoems, loading },
  } = useStihiRuRootStore();
  return (
    <Button disabled={!haveSelectedChapter || loading} onClick={loadPoems}>
      Загрузить выбранное
    </Button>
  );
});
StihiRuButtonLoadSelected.displayName = "StihiRuButtonLoadSelected";
