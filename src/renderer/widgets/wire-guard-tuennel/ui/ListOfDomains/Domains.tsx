import { useSettingsFormContext } from "../../providers/ContextFormSettingsTunnel";
import { ListItemInput } from "../ListItemInput";

/**
 * Настройка VPN / Список доменов
 */
export const Domains = () => {
  const form = useSettingsFormContext();

  return (
    <>
      {form.getValues().excludeFromVpn.map((dns, indexOfDns) => (
        <ListItemInput
          key={dns.key}
          fieldName="excludeFromVpn"
          indexOfRecord={indexOfDns}
        />
      ))}
    </>
  );
};
