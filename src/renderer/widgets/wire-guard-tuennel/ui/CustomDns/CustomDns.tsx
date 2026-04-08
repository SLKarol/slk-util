import { Container, Text } from "@mantine/core";

import { AddNew } from "../AddNew";

import { ListDns } from "./ListDns";

export const CustomDns = () => {
  return (
    <Container flex={1}>
      <Text fw="bold">Кастомные DNS для получения инфы о доменах</Text>
      <ListDns />
      <AddNew />
    </Container>
  );
};
