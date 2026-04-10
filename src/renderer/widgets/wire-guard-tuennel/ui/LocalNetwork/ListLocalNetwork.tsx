import { useSettingsFormContext } from "../../providers/ContextFormSettingsTunnel";
import { ListItemInput } from "../ListItemInput";

/**
 * Настройки локальных сетей для WireGuard.
 */
export const ListLocalNetwork = () => {
  const form = useSettingsFormContext();

  return (
    <>
      {form.getValues()?.localNetworks.map((dns, indexOfDns) => (
        <ListItemInput
          key={dns.key}
          fieldName="localNetworks"
          indexOfRecord={indexOfDns}
        />
      ))}
    </>
  );
};
