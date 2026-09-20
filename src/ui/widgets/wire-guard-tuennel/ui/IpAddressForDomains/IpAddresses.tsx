import { Container, Text, Title } from "@mantine/core";

type Props = {
  /**
   * Список ip адресов
   */
  addresses: string[];
  /**
   * Версия ip адреса
   */
  ipVersion: "ipv4" | "ipv6";
};

/**
 * Вывод списка ip адресов
 */
export const IpAddresses = ({ addresses, ipVersion }: Props) => {
  if (Array.isArray(addresses) && addresses.length > 0)
    return (
      <Container>
        <Title order={6}>
          {ipVersion === "ipv4" ? "IPv4" : "IPv6"} адреса:
        </Title>
        <Text pl="1rem">{addresses.join(", ")}</Text>
      </Container>
    );

  return null;
};
