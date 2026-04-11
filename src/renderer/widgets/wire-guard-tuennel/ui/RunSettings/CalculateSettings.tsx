import { Container, Title } from "@mantine/core";

import { useGetCalculateSettings } from "@renderer-features/wire-guard-tunnel/hooks/useGetCalculateSettings";

import { ExcludedValue } from "./ExcludedValue";

/**
 * Настройка VPN.
 * Вычисленная настройка адресов для тунеля.
 */
export const CalculateSettings = () => {
  const dataExluded = useGetCalculateSettings();

  return (
    <Container m={0}>
      <Title order={4}>Вычисленная настройка адресов:</Title>
      <Title order={5}>Доступные адреса с поддержкой ipv6</Title>
      <ExcludedValue address={dataExluded.ipv6Excluded} />
      <Title order={5}>Доступные адреса только ipv4</Title>
      <ExcludedValue address={dataExluded.ipv4Excluded} />
    </Container>
  );
};
