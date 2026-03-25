import { Container, List } from "@mantine/core";
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
    <Container flex={1}>
      <List>
        {invites.map((poem) => (
          <StihiRuRecordHead key={poem.href} poem={poem} />
        ))}
      </List>
    </Container>
  );
});
StihiRuInvites.displayName = "StihiRuInvites";
