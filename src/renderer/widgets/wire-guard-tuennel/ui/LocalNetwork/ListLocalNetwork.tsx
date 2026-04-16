import { observer } from "mobx-react-lite";

import { useSettingsFormContext } from "../../providers/ContextFormSettingsTunnel";

import { useWireGuardTunnelRootStore } from "@renderer/providers/wire-guard-tunnel/useWireGuardTunnelRootStore";
import { ListItemInput } from "@renderer/widgets/shared/ui/ListItemInput";

/**
 * Настройки локальных сетей для WireGuard.
 */
export const ListLocalNetwork = observer(() => {
  const form = useSettingsFormContext();
  const {
    status: { isWorking },
  } = useWireGuardTunnelRootStore();

  return (
    <>
      {form.getValues()?.localNetworks.map((dns, indexOfDns) => (
        <ListItemInput
          key={dns.key}
          fieldName="localNetworks"
          indexOfRecord={indexOfDns}
          form={form}
          disabled={isWorking}
        />
      ))}
    </>
  );
});
ListLocalNetwork.displayName = "ListLocalNetwork";
