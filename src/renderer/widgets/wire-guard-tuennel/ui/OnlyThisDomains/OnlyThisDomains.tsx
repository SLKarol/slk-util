import { Container, Text } from "@mantine/core";

import { AddNew } from "../AddNew";

import { FavoriteDomains } from "./FavoriteDomains";

/**
 * Настройка VPN. Список доменов.
 */
export const OnlyThisDomains = () => {
  return (
    <Container flex={2}>
      <Text fw="bold">Домены, которые проходят только через VPN</Text>
      <FavoriteDomains />
      <AddNew fieldName="onlyThisDomains" />
    </Container>
  );
};
