import { type PropsWithChildren, useEffect } from "react";
import { randomId } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import {
  SettingsFormProvider,
  type StringValueWithKey,
  useSettingsForm,
} from "../providers/ContextFormSettingsTunnel";

import { useWireGuardTunnelRootStore } from "@renderer/providers/wire-guard-tunnel/useWireGuardTunnelRootStore";

import { getFormValuesforWork } from "./helpers/getFormValuesforWork";

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
      localNetworks: [],
      onlyThisDomains: [],
      methodExcludeDomainsFromVpn: true,
    },
    validate: {
      excludeFromVpn: {
        value: (enteredDomain: string) =>
          enteredDomain.trim().length === 0 ? "Введите адрес домена" : null,
      },
      siteInfoDnsServers: {
        value: (enteredDns: string) =>
          enteredDns.trim().length === 0 ? "Введите адрес DNS" : null,
      },
      localNetworks: {
        value: (enteredMask: string) =>
          enteredMask.trim().length === 0 ? "Введите диапазон IP" : null,
      },
      onlyThisDomains: {
        value: (enteredDomain: string) =>
          enteredDomain.trim().length === 0 ? "Введите адрес домена" : null,
      },
      methodExcludeDomainsFromVpn: (value, values) => {
        if (value && values.excludeFromVpn.length === 0) {
          return "Введите домены для исключения из VPN";
        } else if (!value && values.onlyThisDomains.length === 0) {
          return "Введите домены для использования только с VPN";
        }
        return null;
      },
    },
  });

  useEffect(() => {
    window.electronAPI.fetchSettings();

    const unsubscribe = window.electronAPI.onReceiveSetting((settings) => {
      const { wireGuardTunnel } = settings;
      const excludeFromVpn = wireGuardTunnel?.excludeFromVpn ?? [];
      const siteInfoDnsServers = wireGuardTunnel?.siteInfoDnsServers ?? [];
      const localNetworks = wireGuardTunnel?.localNetworks ?? [];
      const onlyThisDomains = wireGuardTunnel?.onlyThisDomains ?? [];

      form.setValues({
        excludeFromVpn: excludeFromVpn.map((value) => ({
          key: randomId(),
          value,
        })),
        siteInfoDnsServers: siteInfoDnsServers.map((value) => ({
          key: randomId(),
          value,
        })),
        localNetworks: localNetworks.map((value) => ({
          key: randomId(),
          value,
        })),
        onlyThisDomains: onlyThisDomains.map((value) => ({
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

          const {
            excludeFromVpn,
            localNetworks,
            onlyThisDomains,
            siteInfoDnsServers,
          } = getFormValuesforWork(formValues);

          form.setValues({
            excludeFromVpn: excludeFromVpn.map((value) => ({
              key: randomId(),
              value,
            })),
            siteInfoDnsServers: siteInfoDnsServers.map((value) => ({
              key: randomId(),
              value,
            })),
            localNetworks: formValues.localNetworks.map(
              ({ value }: StringValueWithKey) => ({
                key: randomId(),
                value: value.trim(),
              }),
            ),
            onlyThisDomains: formValues.onlyThisDomains.map(
              ({ value }: StringValueWithKey) => ({
                key: randomId(),
                value: value.trim(),
              }),
            ),
          });

          window.electronAPI.startTunnelSettings({
            excludeFromVpn,
            siteInfoDnsServers,
            localNetworks,
            onlyThisDomains,
            methodExcludeDomainsFromVpn: formValues.methodExcludeDomainsFromVpn,
          });
        })}
      >
        {children}
      </form>
    </SettingsFormProvider>
  );
};
SettingsForm.displayName = "SettingsForm";
