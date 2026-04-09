import { randomId } from "@mantine/hooks";
import { action, computed, makeObservable, observable } from "mobx";

import { type AppSettingsWireGuardTunnel } from "@shared/lib/types/app-settings";

import {
  type SettingsFormValues,
  type StringValueWithKey,
} from "@renderer/widgets/wire-guard-tuennel/providers/ContextFormSettingsTunnel";

import { SetSettingOnKeyPayload } from "./settings.types";

export class SettingsStore implements AppSettingsWireGuardTunnel {
  allowedIPs: string;
  excludeFromVpn: string[];
  siteInfoDnsServers: string[];

  constructor() {
    this.allowedIPs = "";
    this.excludeFromVpn = [];
    this.siteInfoDnsServers = [];

    makeObservable(this, {
      // observable
      allowedIPs: observable,
      excludeFromVpn: observable,
      siteInfoDnsServers: observable,
      // action
      setSettings: action,
      setSettingOnKey: action,
      saveSettingsAndRunElectronIpc: action,
      // computed
      siteInfoDnsServersUi: computed,
    });
  }

  /**
   * Записать основные настройки в стор
   */
  setSettings = ({
    allowedIPs,
    excludeFromVpn,
    siteInfoDnsServers,
  }: AppSettingsWireGuardTunnel) => {
    this.allowedIPs = allowedIPs;
    this.excludeFromVpn = excludeFromVpn;
    this.siteInfoDnsServers = siteInfoDnsServers;
  };

  /**
   * Записать значение в стор по названию поля
   */
  setSettingOnKey = ({ key, value }: SetSettingOnKeyPayload) => {
    if (key in this) {
      this[key] = value as never;
    }
  };

  /**
   * DNS серверы, которые будут использованы для определения инфы о сайте.
   * Для отображения в Form-UI.
   */
  get siteInfoDnsServersUi() {
    return this.siteInfoDnsServers.map(
      (value) => ({ key: randomId(), value }) as StringValueWithKey,
    );
  }

  /**
   * Домены, которые будут использованы для определения тунелей.
   * Для отображения в Form-UI.
   */
  get excludeFromVpnUi() {
    return this.excludeFromVpn.map(
      (value) => ({ key: randomId(), value }) as StringValueWithKey,
    );
  }

  /**
   * Сохранить настройки, которые пришли из формы.
   * После записи в стор запускается расчет ip.
   */
  saveSettingsAndRunElectronIpc = (setings: SettingsFormValues) => {
    const excludeFromVpn = [
      ...new Set(
        setings.excludeFromVpn.map((enteredDomain) =>
          enteredDomain.value.trim(),
        ),
      ),
    ];
    const siteInfoDnsServers = [
      ...new Set(setings.siteInfoDnsServers.map(({ value }) => value.trim())),
    ];

    this.excludeFromVpn = excludeFromVpn;
    this.siteInfoDnsServers = siteInfoDnsServers;
    window.electronAPI.startTunnelSettings({
      excludeFromVpn,
      siteInfoDnsServers,
    });
  };
}
