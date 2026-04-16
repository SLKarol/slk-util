import { Container, Text } from "@mantine/core";

import { useSettingsFormContext } from "../../providers/ContextFormSettingsTunnel";

import { AddNewItem } from "@renderer/widgets/shared/ui/AddNewItem";

import { ListLocalNetwork } from "./ListLocalNetwork";

/**
 * Ввод локальных сетей для WireGuard. Здесь нужно вводить диапазоны, например
 */
export const LocalNetwork = () => {
  const form = useSettingsFormContext();
  return (
    <Container flex={1}>
      <Text fw="bold">Здесь введите диапазоны(!) для локальных сетей</Text>
      <ListLocalNetwork />
      <AddNewItem
        fieldName="localNetworks"
        form={form}
        whatAdd="Добавить локальную сеть"
      />
    </Container>
  );
};
