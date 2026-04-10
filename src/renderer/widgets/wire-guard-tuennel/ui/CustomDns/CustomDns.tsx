import { Container, Text } from "@mantine/core";

import { AddNew } from "../AddNew";

import { ListDns } from "./ListDns";

/**
 * Настройки кастомных DNS
 */
export const CustomDns = () => {
  return (
    <Container flex={1}>
      <Text fw="bold">Кастомные DNS для получения инфы о доменах</Text>
      <Text size="sm">В настоящий момент не поддерживается.</Text>
      <ListDns />
      <AddNew fieldName="siteInfoDnsServers" />
    </Container>
  );
};
