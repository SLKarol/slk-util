import { Card, Container, Group, Text } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

import classes from "./StihiRuBanned.module.css";

/**
 * Компонент отображения заблокированных авторов.
 */
export const StihiRuBanned = observer(() => {
  const {
    stihiRuBanAuthrorsStore: { countBadAuthors },
  } = useStihiRuRootStore();
  return (
    <Container size={420} my={40}>
      <Card withBorder radius="md" p="xl" className={classes.card}>
        <Text fz="lg" className={classes.title} fw={500}>
          Заблокированные авторы
        </Text>
        <Group gap="xl">
          <Text>Всего:</Text>
          <Text>{countBadAuthors}</Text>
        </Group>
      </Card>
    </Container>
  );
});
StihiRuBanned.displayName = "StihiRuBanned";
