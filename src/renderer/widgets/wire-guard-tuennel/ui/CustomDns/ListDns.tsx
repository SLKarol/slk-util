import { useSettingsFormContext } from "../../providers/ContextFormSettingsTunnel";
import { ListItemInput } from "../ListItemInput";

/**
 * Ввод кастомных DNS / Список
 */
export const ListDns = () => {
  const form = useSettingsFormContext();

  return (
    <>
      {form.getValues()?.siteInfoDnsServers.map((dns, indexOfDns) => (
        <ListItemInput
          key={dns.key}
          fieldName="siteInfoDnsServers"
          indexOfRecord={indexOfDns}
        />
      ))}
    </>
  );
};
