import { useEffect } from "react";
import { useMap } from "@mantine/hooks";

import { type IPRange } from "@shared/lib/types/tunnel";

/**
 * Хук для получения IP-адреса по доменному имени через IPC-событие.
 *
 * Использует `useMap` из `@mantine/hooks` для создания и управления картой соответствий "домен → диапазон IP-адресов".
 * При монтировании компонента подписывается на событие `receiveDomainAddress`, которое отправляется из Electron API.
 * Как только приходят данные с адресом, они сохраняются в карте по ключу домена.
 *
 * @returns {ReturnType<typeof useMap<string, IPRange>>} Карта, где ключ — домен (строка), значение — объект типа `IPRange`.
 */
export const useGetAddressForDomain = () => {
  const mapAddress = useMap<string, IPRange>();

  useEffect(() => {
    const unsubscribe = window.electronAPI.receiveDomainAddress(
      ({ address, domain }) => {
        mapAddress.set(domain, address);
      },
    );

    return unsubscribe;
  }, []);

  return mapAddress;
};
