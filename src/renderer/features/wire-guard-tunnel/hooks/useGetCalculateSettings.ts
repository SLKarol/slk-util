import { useEffect, useState } from "react";

import { type ReceiveExcludedCidrs } from "@shared/lib/types/electron-api";

/**
 * Пользовательский React хук, который получает и управляет настройками исключенных CIDR.
 * Подписывается на изменения исключенных CIDR через Electron API и предоставляет текущие данные.
 *
 * @returns {ReceiveExcludedCidrs} Объект, содержащий массивы исключенных IPv4 и IPv6 CIDR.
 */
export const useGetCalculateSettings = () => {
  const [dataExluded, setDataExluded] = useState<ReceiveExcludedCidrs>({
    ipv4Excluded: [],
    ipv6Excluded: [],
  });
  useEffect(() => {
    const unsubscribe = window.electronAPI.receiveExcludedCidrs((data) => {
      setDataExluded(data);
    });

    return unsubscribe;
  }, []);

  return dataExluded;
};
