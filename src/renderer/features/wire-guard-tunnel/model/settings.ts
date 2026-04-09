import { randomId } from "@mantine/hooks";
import { action, computed, makeObservable, observable } from "mobx";

import { type AppSettingsWireGuardTunnel } from "@shared/lib/types/app-settings";

import { type StringValueWithKey } from "@renderer/widgets/wire-guard-tuennel/providers/ContextFormSettingsTunnel";

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
}
