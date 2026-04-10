import { StatusStore } from "./status-work";

export class WireGuardTunnelRootStore {
  /**
   * Статус работы настроек WireGuard
   * */
  status: StatusStore;

  constructor() {
    this.status = new StatusStore();
  }
}
