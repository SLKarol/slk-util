import { List } from "@mantine/core";

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
export const LogBotEnterListItem = ({ statistic }: Props) => {
  return (
    <List.Item>
      {formatDateFromString(statistic.date, "HH:mm:ss")} | {statistic.message}
    </List.Item>
  );
};
