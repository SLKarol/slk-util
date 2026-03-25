import { List, Stack, Title } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Список случайных номеров произведений
 */
export const StihiRuListRandomeNumber = observer(() => {
  const {
    historySelectedPartsStore: { selectedDatesReverse },
  } = useStihiRuRootStore();
  return (
    <Stack flex={1} gap="xs">
      <Title order={4}>История выбранных разделов</Title>
      <List listStyleType="none">
        {selectedDatesReverse.map((sihiChapter, indexSihiChapter) => (
          <List.Item
            key={sihiChapter.idHistory}
            fw={indexSihiChapter === 0 ? "bold" : undefined}
          >
            {sihiChapter.textContent}
          </List.Item>
        ))}
      </List>
    </Stack>
  );
});
StihiRuListRandomeNumber.displayName = "StihiRuListRandomeNumber";
