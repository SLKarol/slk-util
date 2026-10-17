import { List } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

import { StihiRuRecordHead } from "./StihiRuRecordHead";

/**
 * Список произведений, где авторы приглашают
 */
export const StihiRuInvites = observer(() => {
  const {
    stihiRuPoemsStore: { invites },
  } = useStihiRuRootStore();
  return (
    <List flex={1}>
      {invites.map((poem) => (
        <StihiRuRecordHead key={poem} poemHref={poem} />
      ))}
    </List>
  );
});
StihiRuInvites.displayName = "StihiRuInvites";
