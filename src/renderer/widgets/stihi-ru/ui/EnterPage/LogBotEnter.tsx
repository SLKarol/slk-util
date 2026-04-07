import { List, ScrollArea } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useRootStore } from "@renderer/providers/useRootStore";

import { LogBotEnterListItem } from "./LogBotEnterListItem";

/**
 * Cтатистика работы бота обхода страниц.
 */
export const LogBotEnter = observer(() => {
  const {
    trackerStihiStore: { statisticBotData },
  } = useRootStore();

  return (
    <ScrollArea h={256}>
      <List>
        {statisticBotData.map((statistic) => (
          <LogBotEnterListItem key={statistic.date} statistic={statistic} />
        ))}
      </List>
    </ScrollArea>
  );
});
LogBotEnter.displayName = "LogBotEnter";
