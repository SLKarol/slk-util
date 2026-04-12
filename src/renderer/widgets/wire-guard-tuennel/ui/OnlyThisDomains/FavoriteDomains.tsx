import { useSettingsFormContext } from "../../providers/ContextFormSettingsTunnel";
import { ListItemInput } from "../ListItemInput";

/**
 * Настройка VPN / Список доменов
 */
export const FavoriteDomains = () => {
  const form = useSettingsFormContext();

  return (
    <>
      {form.getValues().onlyThisDomains.map((dns, indexOfDns) => (
        <ListItemInput
          key={dns.key}
          fieldName="onlyThisDomains"
          indexOfRecord={indexOfDns}
        />
      ))}
    </>
  );
};
