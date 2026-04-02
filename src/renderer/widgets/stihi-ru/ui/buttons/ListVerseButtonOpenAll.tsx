import { Button, Tooltip } from "@mantine/core";
import { IconWorldWww } from "@tabler/icons-react";
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
      <Button
        color="indigo"
        onClick={onClick}
        leftSection={<IconWorldWww size={14} />}
      >
        Открыть всё
      </Button>
    </Tooltip>
  );
});
ListVerseButtonOpenAll.displayName = "ListVerseButtonOpenAll";
