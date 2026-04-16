import { Container, Text } from "@mantine/core";

import { useSettingsFormContext } from "../../providers/ContextFormSettingsTunnel";

import { AddNewItem } from "@renderer/widgets/shared/ui/AddNewItem";

import { Domains } from "./Domains";

/**
 * Настройка VPN. Список доменов.
 */
export const ListOfDomains = () => {
  const form = useSettingsFormContext();
  return (
    <Container flex={2}>
      <Text fw="bold">Домены, которые проходят не через VPN</Text>
      <Domains />
      <AddNewItem
        fieldName="excludeFromVpn"
        form={form}
        whatAdd="Добавить адрес(домен)"
      />
    </Container>
  );
};
