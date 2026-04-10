import { Text } from "@mantine/core";

import { useGetAddressForDomain } from "@renderer-features/wire-guard-tunnel/hooks/useGetAddressForDomain";

import { AddressForDomain } from "./AddressForDomain";

/**
 * Запрос и вывод списка IP-адресов для доменов
 */
export const ListAddress = () => {
  const mapAddress = useGetAddressForDomain();
  if (mapAddress.size > 0)
    return (
      <>
        {Array.from(mapAddress.entries()).map(([domain, address]) => (
          <AddressForDomain key={domain} domain={domain} address={address} />
        ))}
      </>
    );

  return <Text>Нет данных.</Text>;
};
