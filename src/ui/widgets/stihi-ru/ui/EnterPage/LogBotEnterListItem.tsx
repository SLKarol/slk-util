import { List } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { type ReceiveStatisticBotData } from "@shared/lib/types/electron-api";
import { formatDateFromString } from "@renderer-shared/lib/dateTime";

type Props = {
  /**
   * Строка с данными статистики.
   */
  statistic: ReceiveStatisticBotData;
};

/**
 * Вывод одной строки статистики.
 */
export const LogBotEnterListItem = observer(({ statistic }: Props) => {
  return (
    <List.Item>
      {formatDateFromString(statistic.date, "HH:mm:ss")} | {statistic.message}
    </List.Item>
  );
});
LogBotEnterListItem.displayName = "LogBotEnterListItem";
