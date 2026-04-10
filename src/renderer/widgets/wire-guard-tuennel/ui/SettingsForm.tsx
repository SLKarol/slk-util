import { type PropsWithChildren, useEffect } from "react";
import { randomId } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import {
  SettingsFormProvider,
  useSettingsForm,
} from "../providers/ContextFormSettingsTunnel";

import { useWireGuardTunnelRootStore } from "@renderer/providers/wire-guard-tunnel/useWireGuardTunnelRootStore";

/**
 * Форма настроек WireGuard
 */
export const SettingsForm = ({ children }: PropsWithChildren) => {
  const {
    status: { setWorking },
  } = useWireGuardTunnelRootStore();

  const form = useSettingsForm({
    mode: "uncontrolled",
    initialValues: {
      siteInfoDnsServers: [],
      excludeFromVpn: [],
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

  useEffect(() => {
    window.electronAPI.fetchSettings();

    const unsubscribe = window.electronAPI.onReceiveSetting((settings) => {
      const { wireGuardTunnel } = settings;
      form.setValues({
        excludeFromVpn: wireGuardTunnel.excludeFromVpn.map((value) => ({
          key: randomId(),
          value,
        })),
        siteInfoDnsServers: wireGuardTunnel.siteInfoDnsServers.map((value) => ({
          key: randomId(),
          value,
        })),
      });
      randomId;
    });
    return unsubscribe;
  }, []);

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
          setWorking();

          const excludeFromVpn = [
            ...new Set(
              formValues.excludeFromVpn.map((enteredDomain) =>
                enteredDomain.value.trim(),
              ),
            ),
          ];
          const siteInfoDnsServers = [
            ...new Set(
              formValues.siteInfoDnsServers.map(({ value }) => value.trim()),
            ),
          ];
          form.setValues({
            excludeFromVpn: excludeFromVpn.map((value) => ({
              key: randomId(),
              value,
            })),
            siteInfoDnsServers: siteInfoDnsServers.map((value) => ({
              key: randomId(),
              value,
            })),
          });

          window.electronAPI.startTunnelSettings({
            excludeFromVpn,
            siteInfoDnsServers,
          });
        })}
      >
        {children}
      </form>
    </SettingsFormProvider>
  );
};
SettingsForm.displayName = "SettingsForm";
