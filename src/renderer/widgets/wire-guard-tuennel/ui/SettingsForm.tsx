import { type PropsWithChildren } from "react";
import { notifications } from "@mantine/notifications";
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
    settings: {
      excludeFromVpnUi,
      siteInfoDnsServersUi,
      saveSettingsAndRunElectronIpc,
    },
    status: { setWorking },
  } = useWireGuardTunnelRootStore();

  const form = useSettingsForm({
    mode: "uncontrolled",
    initialValues: {
      siteInfoDnsServers: Array.from(siteInfoDnsServersUi),
      excludeFromVpn: Array.from(excludeFromVpnUi),
    },
    validate: {
      excludeFromVpn: {
        value: (enteredDomain) =>
          enteredDomain.trim().length === 0 ? "Введите адрес домена" : null,
      },
      siteInfoDnsServers: {
        value: (enteredDns) =>
          enteredDns.trim().length === 0 ? "Введите адрес DNS" : null,
      },
    },
  });

  return (
    <SettingsFormProvider form={form}>
      <form
        onSubmit={form.onSubmit((formValues) => {
          if (formValues.excludeFromVpn.length === 0) {
            notifications.show({
              color: "red",
              message: "Не введены домены",
            });
            return;
          }
          saveSettingsAndRunElectronIpc(formValues);
          setWorking();
        })}
      >
        {children}
      </form>
    </SettingsFormProvider>
  );
});
SettingsForm.displayName = "SettingsForm";
