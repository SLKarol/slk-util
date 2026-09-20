import { Checkbox } from "@mantine/core";

import { useSettingsFormContext } from "../providers/ContextFormSettingsTunnel";

export const CheckMethodExclude = () => {
  const form = useSettingsFormContext();
  return (
    <Checkbox
      mt="sm"
      label="Использовать метод исключения доменов из VPN: если включено, то домены из списка 'Домены, которые не проходят через VPN' будут исключены из VPN-туннеля. Если выключено, то домены из этого списка будут единственными, которые проходят через VPN."
      key={form.key("methodExcludeDomainsFromVpn")}
      {...form.getInputProps("methodExcludeDomainsFromVpn", {
        type: "checkbox",
      })}
    />
  );
};
