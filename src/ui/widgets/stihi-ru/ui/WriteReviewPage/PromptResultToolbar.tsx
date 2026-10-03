import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconClipboardCopy } from "@tabler/icons-react";

export const PromptResultToolbar = () => {
  return (
    <Flex>
      <Tooltip label="Скопировать в буфер обмена">
        <ActionIcon>
          <IconClipboardCopy />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};
