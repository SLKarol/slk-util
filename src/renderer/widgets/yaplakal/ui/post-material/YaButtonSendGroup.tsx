import { ActionIcon, Tooltip } from "@mantine/core";
import { IconBrandTelegram } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { useYaPlakalRuRootStore } from "@renderer/providers/ya-plakal/useYaplakalRootStore";

/**
 * Кнопка для отправки выбранных медиа через Telegram-бота.
 */
export const YaButtonSendGroup = observer(() => {
  const {
    itemsToSend: { mediaRecords },
  } = useYaPlakalRuRootStore();
  return (
    <Tooltip label="Отправить выбранное">
      <ActionIcon
        variant="filled"
        disabled={mediaRecords.length === 0}
        onClick={() =>
          window.electronAPI.telegramBotSendGroup(
            mediaRecords.map((record) => ({
              url: record.id,
              title: "",
            })),
          )
        }
      >
        <IconBrandTelegram />
      </ActionIcon>
    </Tooltip>
  );
});
YaButtonSendGroup.displayName = "YaButtonSendGroup";
