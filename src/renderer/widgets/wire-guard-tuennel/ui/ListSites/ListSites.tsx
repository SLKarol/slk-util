import { Container, Text } from "@mantine/core";

import { AddNew } from "../AddNew";

import { ListDomains } from "./ListDomains";

export const ListSites = () => {
  return (
    <Container flex={2}>
      <Text fw="bold">Сайты, которые проходят не через VPN</Text>
      <ListDomains />
      <AddNew />
    </Container>
  );
};
