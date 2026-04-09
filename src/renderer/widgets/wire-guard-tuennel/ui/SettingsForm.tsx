import { type PropsWithChildren } from "react";
import { observer } from "mobx-react-lite/dist";

import {
  SettingsFormProvider,
  useSettingsForm,
} from "../providers/ContextFormSettingsTunnel";

import { useWireGuardTunnelRootStore } from "@renderer/providers/wire-guard-tunnel/useWireGuardTunnelRootStore";

/**
 * Форма настроек WireGuard
 */
export const SettingsForm = observer(({ children }: PropsWithChildren) => {
  const {
    settings: { excludeFromVpnUi, siteInfoDnsServersUi },
  } = useWireGuardTunnelRootStore();

  const form = useSettingsForm({
    mode: "uncontrolled",
    initialValues: {
      siteInfoDnsServers: Array.from(siteInfoDnsServersUi),
      excludeFromVpn: Array.from(excludeFromVpnUi),
    },
  });

  return (
    <SettingsFormProvider form={form}>
      <form
        onSubmit={form.onSubmit((formValues) => {
          console.log(formValues);
        })}
      >
        {children}
      </form>
    </SettingsFormProvider>
  );
});
SettingsForm.displayName = "SettingsForm";
