import { Checkbox } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useRootStore } from "@renderer/providers/useRootStore";

/**
 * Checkbox для выбора праздника
 */
export const SelectHolidayCheckbox = observer(() => {
  const {
    holidaysStore: { selectedHoliday, sendHolidayName, toggleSendHolidayName },
  } = useRootStore();

  return (
    <Checkbox
      checked={sendHolidayName}
      onChange={toggleSendHolidayName}
      label={selectedHoliday}
    />
  );
});
SelectHolidayCheckbox.displayName = "SelectHolidayCheckbox";
