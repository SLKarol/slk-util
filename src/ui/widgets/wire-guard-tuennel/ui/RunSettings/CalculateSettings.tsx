import { Container, Spoiler, Title } from "@mantine/core";

import { useGetCalculateSettings } from "@renderer-features/wire-guard-tunnel/hooks/useGetCalculateSettings";

import { ExcludedValue } from "./ExcludedValue";

/**
 * Настройка VPN.
 * Вычисленная настройка адресов для тунеля.
 */
export const CalculateSettings = () => {
  const dataExluded = useGetCalculateSettings();

  return (
    <Container m="1rem">
      <Title order={4}>Вычисленная настройка адресов:</Title>
      <Title order={5}>Доступные адреса с поддержкой ipv6</Title>
      <Spoiler maxHeight={120} showLabel="Показать всё" hideLabel="Скрыть">
        <ExcludedValue address={dataExluded.ipv6Excluded} />
      </Spoiler>
      <Title order={5}>Доступные адреса только ipv4</Title>
      <Spoiler maxHeight={120} showLabel="Показать всё" hideLabel="Скрыть">
        <ExcludedValue address={dataExluded.ipv4Excluded} />
      </Spoiler>
    </Container>
  );
};
