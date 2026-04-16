import { observer } from "mobx-react-lite";

import { useSettingsFormContext } from "../../providers/ContextFormSettingsTunnel";

import { useWireGuardTunnelRootStore } from "@renderer/providers/wire-guard-tunnel/useWireGuardTunnelRootStore";
import { ListItemInput } from "@renderer/widgets/shared/ui/ListItemInput";

/**
 * Настройка VPN / Список доменов
 */
export const Domains = observer(() => {
  const form = useSettingsFormContext();
  const {
    status: { isWorking },
  } = useWireGuardTunnelRootStore();
  return (
    <>
      {form.getValues().excludeFromVpn.map((dns, indexOfDns) => (
        <ListItemInput
          key={dns.key}
          fieldName="excludeFromVpn"
          indexOfRecord={indexOfDns}
          form={form}
          disabled={isWorking}
        />
      ))}
    </>
  );
});
Domains.displayName = "Domains";
