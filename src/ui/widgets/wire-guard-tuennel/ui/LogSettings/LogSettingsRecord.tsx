import { List } from "@mantine/core";
import dayjs from "dayjs";

import { ReceiveCalculateCidrsLog } from "@shared/lib/types/electron-api";

interface Props {
  cidrsLog: ReceiveCalculateCidrsLog;
}

export const LogSettingsRecord = ({ cidrsLog: { dateTime, log } }: Props) => {
  return (
    <List.Item>{`${dayjs(dateTime).format("DD.MM.YYYY HH:mm")} | ${log}`}</List.Item>
  );
};
