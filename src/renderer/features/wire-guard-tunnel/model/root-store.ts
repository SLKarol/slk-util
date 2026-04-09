import { SettingsStore } from "./settings";
import { StatusStore } from "./status-work";

export class WireGuardTunnelRootStore {
  /**
   * Настройки WireGuard
   */
  settings: SettingsStore;
  /**
   * Статус работы настроек WireGuard
   * */
  status: StatusStore;

  constructor() {
    this.settings = new SettingsStore();
    this.status = new StatusStore();
  }
}
