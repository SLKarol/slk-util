import { List, Stack, Title } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

import styles from "./StihiRuListSelectedNumbers.module.css";

/**
 * Список выбранных номеров произведений
 */
export const StihiRuListSelectedNumbers = observer(() => {
  const {
    historySelectedPartsStore: { selectedDatesReverse },
  } = useStihiRuRootStore();
  return (
    <Stack flex={1} gap="xs" className={styles.padding}>
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
StihiRuListSelectedNumbers.displayName = "StihiRuListSelectedNumbers";
