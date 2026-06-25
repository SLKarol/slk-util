import { ActionIcon, Tooltip } from "@mantine/core";
import { IconEraser } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { useYaPlakalRuRootStore } from "@renderer/providers/ya-plakal/useYaplakalRootStore";

export const YaButtonClearSelected = observer(() => {
  const {
    itemsToSend: { clearItems, countSelected },
  } = useYaPlakalRuRootStore();

  return (
    <Tooltip label="Очистить выбранное">
      <ActionIcon
        variant="filled"
        onClick={clearItems}
        disabled={countSelected === 0}
      >
        <IconEraser />
      </ActionIcon>
    </Tooltip>
  );
});
YaButtonClearSelected.displayName = "YaButtonClearSelected";
