import { Button, Tooltip } from "@mantine/core";
import { IconWorldWww } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Кнопка "Открыть все произведения в броузере"
 */
export const ListVerseButtonOpenAll = observer(() => {
  const {
    stihiRuPoemsStore: { linkAllPoems },
  } = useStihiRuRootStore();

  const onClick = () => {
    window.electronAPI.stihiOpenAllPoems(linkAllPoems);
  };

  return (
    <Tooltip label="Открыть все произведения в броузере">
      <Button onClick={onClick} leftSection={<IconWorldWww size={14} />}>
        Открыть всё
      </Button>
    </Tooltip>
  );
});
ListVerseButtonOpenAll.displayName = "ListVerseButtonOpenAll";
