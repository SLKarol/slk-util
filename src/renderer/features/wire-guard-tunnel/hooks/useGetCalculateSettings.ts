import { useEffect, useState } from "react";

import { type ReceiveCalculateCidrs } from "@shared/lib/types/electron-api";

/**
 * Пользовательский React хук, который получает и управляет настройками исключенных CIDR.
 * Подписывается на изменения исключенных CIDR через Electron API и предоставляет текущие данные.
 *
 * @returns {ReceiveCalculateCidrs} Объект, содержащий массивы исключенных IPv4 и IPv6 CIDR.
 */
export const useGetCalculateSettings = () => {
  const [dataExluded, setDataExluded] = useState<ReceiveCalculateCidrs>({
    ipv4Excluded: [],
    ipv6Excluded: [],
  });
  useEffect(() => {
    const unsubscribe = window.electronAPI.receiveCalculateCidrs((data) => {
      setDataExluded(data);
    });

    return unsubscribe;
  }, []);

  return dataExluded;
};
