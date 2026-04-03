import { List, Stack, Title } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

import { StihiRuRecordHead } from "./StihiRuRecordHead";

/**
 * Список новых произведений
 */
export const StihiRuListListNew = observer(() => {
  const {
    stihiRuPoemsStore: { newPoems },
  } = useStihiRuRootStore();
  return (
    <Stack gap="xs" flex={1}>
      <Title order={3}>Новые произведения</Title>
      <List flex={1}>
        {newPoems.map((poem: string) => (
          <StihiRuRecordHead key={poem} poemHref={poem} />
        ))}
      </List>
    </Stack>
  );
});
StihiRuListListNew.displayName = "StihiRuListListNew";
