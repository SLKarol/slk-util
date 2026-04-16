import { Container, Text } from "@mantine/core";

import { useSettingsFormContext } from "../../providers/ContextFormSettingsTunnel";

import { AddNewItem } from "@renderer/widgets/shared/ui/AddNewItem";

import { ListDns } from "./ListDns";

/**
 * Настройки кастомных DNS
 * Компонента пока нигде не используется,
 * т.к. в electron нет необходимости задавать свой днс
 */
export const CustomDns = () => {
  const form = useSettingsFormContext();
  return (
    <Container flex={1}>
      <Text fw="bold">Кастомные DNS для получения инфы о доменах</Text>
      <Text size="sm">В настоящий момент не поддерживается.</Text>
      <ListDns />
      <AddNewItem
        fieldName="siteInfoDnsServers"
        form={form}
        whatAdd="Добавить DNS"
      />
    </Container>
  );
};
