import { ActionIcon, Tooltip } from "@mantine/core";
import { IconBrandTelegram } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { useRootStore } from "@renderer/providers/useRootStore";
import { useYaPlakalRuRootStore } from "@renderer/providers/ya-plakal/useYaplakalRootStore";

/**
 * Кнопка для отправки выбранных медиа через Telegram-бота.
 */
export const YaButtonSendGroup = observer(() => {
  const {
    itemsToSend: { mediaRecords },
    sendSelectedToTelegram,
  } = useYaPlakalRuRootStore();

  const {
    holidaysStore: { selectedHoliday, sendHolidayName },
  } = useRootStore();

  const onClick = () => {
    sendSelectedToTelegram({ selectedHoliday, sendHolidayName });
  };

  return (
    <Tooltip label="Отправить выбранное">
      <ActionIcon
        variant="filled"
        disabled={mediaRecords.length === 0}
        onClick={onClick}
      >
        <IconBrandTelegram />
      </ActionIcon>
    </Tooltip>
  );
});
YaButtonSendGroup.displayName = "YaButtonSendGroup";
