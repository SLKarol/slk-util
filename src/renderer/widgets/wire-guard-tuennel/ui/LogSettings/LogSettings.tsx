import { List, ScrollArea } from "@mantine/core";

import { LogSettingsRecord } from "./LogSettingsRecord";

export const LogSettings = () => {
  return (
    <ScrollArea h={256}>
      <List>
        <LogSettingsRecord />
      </List>
    </ScrollArea>
  );
};
