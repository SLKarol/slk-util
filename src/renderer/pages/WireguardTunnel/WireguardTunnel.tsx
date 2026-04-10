import { Container, Flex } from "@mantine/core";

import { CustomDns } from "@renderer/widgets/wire-guard-tuennel/ui/CustomDns/CustomDns";
import { IpAddressForDomains } from "@renderer/widgets/wire-guard-tuennel/ui/IpAddressForDomains/IpAddressForDomains";
import { ListOfDomains } from "@renderer/widgets/wire-guard-tuennel/ui/ListOfDomains/ListOfDomains";
import { LogSettings } from "@renderer/widgets/wire-guard-tuennel/ui/LogSettings/LogSettings";
import { CalculateSettings } from "@renderer/widgets/wire-guard-tuennel/ui/RunSettings/CalculateSettings";
import { SettingsButtonRun } from "@renderer/widgets/wire-guard-tuennel/ui/RunSettings/SettingsButtonRun";
import { SaveSettings } from "@renderer/widgets/wire-guard-tuennel/ui/SaveSettings";
import { SettingsForm } from "@renderer/widgets/wire-guard-tuennel/ui/SettingsForm";

import { useInitHandlers } from "./helpers/useInitHandlers";

/**
 * Главная страница настройки WireGuard
 */
export const WireguardTunnel = () => {
  useInitHandlers();
  return (
    <Container size="lg">
      <SettingsForm>
        <Flex gap="0.1rem" my={10}>
          <CustomDns />
          <ListOfDomains />
        </Flex>
        <Flex gap="1rem">
          <SettingsButtonRun />
          <SaveSettings />
        </Flex>
      </SettingsForm>
      <IpAddressForDomains />
      <CalculateSettings />
      <LogSettings />
    </Container>
  );
};
