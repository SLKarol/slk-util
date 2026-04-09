import { Container, Flex, Text, Title } from "@mantine/core";

/**
 * Настройка VPN.
 * Вычисленная настройка адресов для тунеля.
 */
export const CalculateSettings = () => {
  return (
    <Container m={0}>
      <Title order={4}>Вычисленная настройка адресов:</Title>
      <Title order={5}>Доступные адреса с поддержкой ipv6</Title>
      <Flex gap="1rem">
        <Text flex={1}>Строка для ipv6</Text>
        <button>C</button>
      </Flex>
      <Title order={5}>Доступные адреса без поддержки ipv4</Title>
      <Flex gap="1rem">
        <Text flex={1}>Строка для ipv4</Text>
        <button>C</button>
      </Flex>
    </Container>
  );
};
