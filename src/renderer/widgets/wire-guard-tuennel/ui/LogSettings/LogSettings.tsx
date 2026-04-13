import { useEffect, useState } from "react";
import {
  ActionIcon,
  Container,
  List,
  ScrollArea,
  Tooltip,
} from "@mantine/core";
import { IconHistoryOff } from "@tabler/icons-react";

import { generateTruncatedUuid } from "@shared/lib/generateId";
import { type ReceiveCalculateCidrsLog } from "@shared/lib/types/electron-api";

import { LogSettingsRecord } from "./LogSettingsRecord";

interface LogSettingsState extends ReceiveCalculateCidrsLog {
  id: bigint;
}

export const LogSettings = () => {
  const [cidrsLogs, setCidrsLogs] = useState<LogSettingsState[]>([]);
  useEffect(() => {
    const unsubscribe = window.electronAPI.receiveCalculateCidrsLog(
      (cidrsLog) => {
        setCidrsLogs((prev) => {
          const newCidrsLogs = [
            ...prev,
            { ...cidrsLog, id: generateTruncatedUuid() },
          ];
          return newCidrsLogs;
        });
      },
    );

    return unsubscribe;
  }, []);

  return (
    <Container>
      {cidrsLogs.length > 0 ? (
        <Tooltip label="Очистить историю">
          <ActionIcon variant="filled" onClick={() => setCidrsLogs([])}>
            <IconHistoryOff />
          </ActionIcon>
        </Tooltip>
      ) : null}
      <ScrollArea h={256}>
        <List>
          {cidrsLogs.map((cidrsLog) => (
            <LogSettingsRecord key={cidrsLog.id} cidrsLog={cidrsLog} />
          ))}
        </List>
      </ScrollArea>
    </Container>
  );
};
