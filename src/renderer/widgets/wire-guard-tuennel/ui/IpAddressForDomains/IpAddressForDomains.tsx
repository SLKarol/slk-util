import { Container, Title } from "@mantine/core";

import { AddressForDomain } from "./AddressForDomain";

/**
 * Список IP-адресов для доменов
 */
export const IpAddressForDomains = () => {
  return (
    <Container m={0}>
      <Title order={4}>IP-адреса для введённых доменов:</Title>
      <AddressForDomain />
      <AddressForDomain />
      <AddressForDomain />
    </Container>
  );
};
