import { Flex } from "@mantine/core";

import { RedditButtonClearSelected } from "./RedditButtonClearSelected";
import { RedditButtonSendGroup } from "./RedditButtonSendGroup";

export const RedditToolbarSelected = () => {
  return (
    <Flex justify="center" align="center" direction="row" wrap="wrap" gap="md">
      <RedditButtonClearSelected />
      <RedditButtonSendGroup />
    </Flex>
  );
};
