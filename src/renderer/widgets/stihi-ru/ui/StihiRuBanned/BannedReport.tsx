import { Card, Group, Text } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

import { ButtonSaveForUBlock } from "./ButtonSaveForUBlock";

import classes from "./StihiRuBanned.module.css";

/**
 * Компонент отображения количества заблокированных авторов.
 */
export const BannedReport = observer(() => {
  const {
    stihiRuBanAuthrorsStore: { countBadAuthors },
  } = useStihiRuRootStore();
  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <Text fz="lg" className={classes.title} fw={500}>
        Заблокированные авторы
      </Text>
      <Group gap="xl">
        <Text>Всего:</Text>
        <Text>{countBadAuthors}</Text>
      </Group>
      <ButtonSaveForUBlock />
    </Card>
  );
});
BannedReport.displayName = "BannedReport";
