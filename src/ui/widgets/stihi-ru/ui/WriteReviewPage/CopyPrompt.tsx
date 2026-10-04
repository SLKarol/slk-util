import { observer } from "mobx-react-lite";
import { ActionIcon, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconClipboardCopy } from "@tabler/icons-react";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Кнопка копирования промпта в буфер обмена
 */
export const CopyPrompt = observer(() => {
  const clipboard = useClipboard({ timeout: 500 });
  const {
    reactionPoems: { prompt },
  } = useStihiRuRootStore();

  return (
    <Tooltip label="Скопировать промпт в буфер обмена">
      <ActionIcon
        variant={clipboard.copied ? "outline" : "filled"}
        onClick={() => clipboard.copy(prompt)}
      >
        <IconClipboardCopy />
      </ActionIcon>
    </Tooltip>
  );
});
CopyPrompt.displayName = "CopyPrompt";
