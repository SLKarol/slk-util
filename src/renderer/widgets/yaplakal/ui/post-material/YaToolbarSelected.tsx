import { Flex } from "@mantine/core";

import { YaButtonClearSelected } from "./YaButtonClearSelected";
import { YaButtonSendGroup } from "./YaButtonSendGroup";

/**
 * Выбранное для отправки
 */
export const YaToolbarSelected = () => {
  return (
    <Flex justify="center" align="center" direction="row" wrap="wrap">
      <YaButtonClearSelected />
      <YaButtonSendGroup />
    </Flex>
  );
};
