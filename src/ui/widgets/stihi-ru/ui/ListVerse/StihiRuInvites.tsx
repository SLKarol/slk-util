import { List, Stack, Title } from "@mantine/core";
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
    <Stack gap="xs" flex={1}>
      <Title order={3}>Авторы приглашают</Title>
      <List>
        {invites.map((poem) => (
          <StihiRuRecordHead key={poem} poemHref={poem} />
        ))}
      </List>
    </Stack>
  );
});
StihiRuInvites.displayName = "StihiRuInvites";
