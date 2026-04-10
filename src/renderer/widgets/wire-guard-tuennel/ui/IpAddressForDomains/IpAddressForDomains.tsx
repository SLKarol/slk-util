import { Container, Title } from "@mantine/core";

import { ListAddress } from "./ListAddress";

/**
 * Список IP-адресов для доменов
 */
export const IpAddressForDomains = () => {
  return (
    <Container m={0}>
      <Title order={4}>IP-адреса для введённых доменов:</Title>
      <ListAddress />
    </Container>
  );
};
