import { ActionIcon, Flex, TextInput } from "@mantine/core";
import { IconSquareX } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { useRedditRootStore } from "@renderer/providers/reddit";

/**
 * Поиск каналов reddit
 */
export const RedditSearchChannels = observer(() => {
  const {
    redditUserSelectedStore: { searchRedditChannel, setSearchRedditChannel },
  } = useRedditRootStore();
  return (
    <Flex align="center" gap="xs">
      <TextInput
        value={searchRedditChannel}
        onChange={(event) => setSearchRedditChannel(event.currentTarget.value)}
        flex={1}
      />
      <ActionIcon onClick={() => setSearchRedditChannel("")}>
        <IconSquareX />
      </ActionIcon>
    </Flex>
  );
});

RedditSearchChannels.displayName = "RedditSearchChannels";
