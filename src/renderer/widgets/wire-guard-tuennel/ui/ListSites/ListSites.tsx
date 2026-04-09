import { Container, Text } from "@mantine/core";

import { AddNew } from "../AddNew";

import { ListDomains } from "./ListDomains";

/**
 * Настройка VPN. Список доменов.
 */
export const ListSites = () => {
  return (
    <Container flex={2}>
      <Text fw="bold">Домены, которые проходят не через VPN</Text>
      <ListDomains />
      <AddNew fieldName="excludeFromVpn" />
    </Container>
  );
};
