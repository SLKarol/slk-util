import { Container, Flex } from "@mantine/core";

import { CheckMethodExclude } from "@renderer/widgets/wire-guard-tuennel/ui/CheckMethodExclude";
import { IpAddressForDomains } from "@renderer/widgets/wire-guard-tuennel/ui/IpAddressForDomains/IpAddressForDomains";
import { ListOfDomains } from "@renderer/widgets/wire-guard-tuennel/ui/ListOfDomains/ListOfDomains";
import { LocalNetwork } from "@renderer/widgets/wire-guard-tuennel/ui/LocalNetwork/LocalNetwork";
import { LogSettings } from "@renderer/widgets/wire-guard-tuennel/ui/LogSettings/LogSettings";
import { OnlyThisDomains } from "@renderer/widgets/wire-guard-tuennel/ui/OnlyThisDomains/OnlyThisDomains";
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
    <Container size="lg" pb="1rem">
      <SettingsForm>
        <Flex gap="0.1rem" my={10}>
          <OnlyThisDomains />
          <ListOfDomains />
          <LocalNetwork />
        </Flex>
        <CheckMethodExclude />
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
