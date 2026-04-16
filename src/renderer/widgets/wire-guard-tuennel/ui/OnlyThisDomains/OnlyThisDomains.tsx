import { Container, Text } from "@mantine/core";

import { useSettingsFormContext } from "../../providers/ContextFormSettingsTunnel";

import { AddNewItem } from "@renderer/widgets/shared/ui/AddNewItem";

import { FavoriteDomains } from "./FavoriteDomains";

/**
 * Настройка VPN. Список доменов.
 */
export const OnlyThisDomains = () => {
  const form = useSettingsFormContext();

  return (
    <Container flex={2}>
      <Text fw="bold">Домены, которые проходят только через VPN</Text>
      <FavoriteDomains />
      <AddNewItem
        fieldName="onlyThisDomains"
        form={form}
        whatAdd="Добавить домен"
      />
    </Container>
  );
};
