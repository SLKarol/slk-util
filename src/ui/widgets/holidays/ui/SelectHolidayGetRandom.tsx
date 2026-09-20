import { ActionIcon, Tooltip } from "@mantine/core";
import { IconArrowsRandom } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { useRootStore } from "@renderer/providers/useRootStore";

/**
 * Кнопка выбора случайного праздника
 */
export const SelectHolidayGetRandom = observer(() => {
  const {
    holidaysStore: { changeRandomHolyday },
  } = useRootStore();

  return (
    <Tooltip label="Выбрать другой случайный праздник">
      <ActionIcon onClick={changeRandomHolyday}>
        <IconArrowsRandom />
      </ActionIcon>
    </Tooltip>
  );
});
SelectHolidayGetRandom.displayName = "SelectHolidayGetRandom";
