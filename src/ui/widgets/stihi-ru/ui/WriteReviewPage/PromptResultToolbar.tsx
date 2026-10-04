import { observer } from "mobx-react-lite";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconClipboardCopy } from "@tabler/icons-react";
import { useClipboard } from "@mantine/hooks";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Тулбарчик для результатов промпта
 */
export const PromptResultToolbar = observer(() => {
  const clipboard = useClipboard({ timeout: 500 });

  const {
    reactionPoems: { promptResultOutput },
  } = useStihiRuRootStore();

  return (
    <Flex>
      <Tooltip label="Скопировать в буфер обмена">
        <ActionIcon
          variant={clipboard.copied ? "outline" : "filled"}
          onClick={() => clipboard.copy(promptResultOutput)}
        >
          <IconClipboardCopy />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
});
PromptResultToolbar.displayName = "PromptResultToolbar";
