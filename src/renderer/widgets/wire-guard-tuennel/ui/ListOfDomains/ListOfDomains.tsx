import { Container, Text } from "@mantine/core";

import { AddNew } from "../AddNew";

import { Domains } from "./Domains";

/**
 * Настройка VPN. Список доменов.
 */
export const ListOfDomains = () => {
  return (
    <Container flex={2}>
      <Text fw="bold">Домены, которые проходят не через VPN</Text>
      <Domains />
      <AddNew fieldName="excludeFromVpn" />
    </Container>
  );
};
