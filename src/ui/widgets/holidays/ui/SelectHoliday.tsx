import { Flex } from "@mantine/core";

import { SelectHolidayCheckbox } from "./SelectHolidayCheckbox";
import { SelectHolidayGetRandom } from "./SelectHolidayGetRandom";

/**
 * Список праздников с возможностью выбора
 */
export const SelectHoliday = () => {
  return (
    <Flex justify="space-between" align="center">
      <SelectHolidayCheckbox />
      <SelectHolidayGetRandom />
    </Flex>
  );
};
