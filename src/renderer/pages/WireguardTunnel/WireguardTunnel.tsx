import { Container, Flex } from "@mantine/core";

import { CustomDns } from "@renderer/widgets/wire-guard-tuennel/ui/CustomDns/CustomDns";
import { ListSites } from "@renderer/widgets/wire-guard-tuennel/ui/ListSites/ListSites";
import { LogSettings } from "@renderer/widgets/wire-guard-tuennel/ui/LogSettings/LogSettings";
import { CalculateSettings } from "@renderer/widgets/wire-guard-tuennel/ui/RunSettings/CalculateSettings";
import { SettingsButtonRun } from "@renderer/widgets/wire-guard-tuennel/ui/RunSettings/SettingsButtonRun";

import { useInitHandlers } from "./helpers/useInitHandlers";

/**
 * Главная страница настройки WireGuard
 */
export const WireguardTunnel = () => {
  useInitHandlers();
  return (
    <Container size="lg">
      <Flex gap="0.1rem" my={10}>
        <CustomDns />
        <ListSites />
      </Flex>
      <SettingsButtonRun />
      <CalculateSettings />
      <LogSettings />
    </Container>
  );
};
