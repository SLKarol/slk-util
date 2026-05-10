import { Flex } from "@mantine/core";

import { YaButtonClearSelected } from "./YaButtonClearSelected";
import { YaButtonSendGroup } from "./YaButtonSendGroup";
import { YaDontSendTitle } from "./YaDontSendTitle";

/**
 * Выбранное для отправки
 */
export const YaToolbarSelected = () => {
  return (
    <>
      <Flex
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
        gap="md"
      >
        <YaButtonClearSelected />
        <YaButtonSendGroup />
      </Flex>
      <YaDontSendTitle />
    </>
  );
};
