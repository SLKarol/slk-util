import { SettingsStore } from "./settings";

export class WireGuardTunnelRootStore {
  settings: SettingsStore;

  constructor() {
    this.settings = new SettingsStore();
  }
}
