import { List } from "@mantine/core";
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
    <List flex={1}>
      {newPoems.map((poem) => (
        <StihiRuRecordHead key={poem.href} poem={poem} />
      ))}
    </List>
  );
});
StihiRuListListNew.displayName = "StihiRuListListNew";
