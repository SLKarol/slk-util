import { Container, Text } from "@mantine/core";

import { AddNew } from "../AddNew";

import { ListLocalNetwork } from "./ListLocalNetwork";

/**
 * Ввод локальных сетей для WireGuard. Здесь нужно вводить диапазоны, например
 */
export const LocalNetwork = () => {
  return (
    <Container flex={1}>
      <Text fw="bold">Здесь введите диапазоны(!) для локальных сетей</Text>
      <ListLocalNetwork />
      <AddNew fieldName="localNetworks" />
    </Container>
  );
};
