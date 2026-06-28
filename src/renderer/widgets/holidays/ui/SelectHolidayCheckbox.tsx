import { Checkbox } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useRedditRootStore } from "@renderer/providers/reddit";
import { useRootStore } from "@renderer/providers/useRootStore";

/**
 * Checkbox для выбора праздника
 */
export const SelectHolidayCheckbox = observer(() => {
  const {
    holidaysStore: { selectedHoliday },
  } = useRootStore();
  const { sendHolidayName, toggleSendHolidayName } = useRedditRootStore();

  return (
    <Checkbox
      checked={sendHolidayName}
      onChange={toggleSendHolidayName}
      label={selectedHoliday}
    />
  );
});
SelectHolidayCheckbox.displayName = "SelectHolidayCheckbox";
