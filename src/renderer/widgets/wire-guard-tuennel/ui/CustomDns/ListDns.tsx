import { observer } from "mobx-react-lite";

import { useSettingsFormContext } from "../../providers/ContextFormSettingsTunnel";

import { useWireGuardTunnelRootStore } from "@renderer/providers/wire-guard-tunnel/useWireGuardTunnelRootStore";
import { ListItemInput } from "@renderer/widgets/shared/ui/ListItemInput";

/**
 * Ввод кастомных DNS / Список
 */
export const ListDns = observer(() => {
  const form = useSettingsFormContext();
  const {
    status: { isWorking },
  } = useWireGuardTunnelRootStore();

  return (
    <>
      {form.getValues()?.siteInfoDnsServers.map((dns, indexOfDns) => (
        <ListItemInput
          key={dns.key}
          fieldName="siteInfoDnsServers"
          indexOfRecord={indexOfDns}
          form={form}
          disabled={isWorking}
        />
      ))}
    </>
  );
});
ListDns.displayName = "ListDns";
