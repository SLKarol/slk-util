import { Box, Container, Text, Title } from "@mantine/core";

import { type IPRange } from "@shared/lib/types/tunnel";

import { IpAddresses } from "./IpAddresses";

interface AddressForDomainProps {
  /**
   * Домен
   */
  domain: string;
  /**
   * Набор ip адресов
   */
  address: IPRange;
}

/**
 * Список ip адресов для домена
 */
export const AddressForDomain = ({
  address,
  domain,
}: AddressForDomainProps) => {
  return (
    <Box>
      <Title order={5} c="#1f32c4">
        {domain}
      </Title>
      {address.ipv4.length > 0 || address.ipv6.length > 0 ? (
        <Container>
          <IpAddresses addresses={address.ipv4} ipVersion="ipv4" />
          <IpAddresses addresses={address.ipv6} ipVersion="ipv6" />
        </Container>
      ) : (
        <Text c="tomato" fw={600} pl="3rem">
          Не удалось определить адреса
        </Text>
      )}
    </Box>
  );
};
