import { excludeCidr } from "cidr-tools";

import { type CalculateExcludedCidrsPayload } from "../../types/tunnel-ipc";

/**
 * Вычисляет исключённые CIDR-диапазоны для IPv4 и IPv6 на основе префиксов доменов и локальных сетей.
 * @returns Объект из двух массивов: {исключённые IPv4 CIDR,  IPv6 CIDR}.
 */
export const calculateExcludedCidrs = ({
  prefixesForDomainsSeparate,
  localNetworks,
}: CalculateExcludedCidrsPayload) => {
  // Функции для определения типа CIDR
  const isIPv4 = (cidr: string): boolean => cidr.includes(".");

  // Собираем исключения для IPv4: префиксы IPv4 доменов + локальные сети IPv4
  const ipv4Exclusions = [
    ...prefixesForDomainsSeparate.ipv4,
    ...localNetworks.filter(isIPv4),
  ];

  // Собираем исключения для IPv6: префиксы IPv4 и IPv6 доменов + локальные сети
  const ipv6Exclusions = [
    ...prefixesForDomainsSeparate.ipv4,
    ...prefixesForDomainsSeparate.ipv6,
    ...localNetworks,
  ];

  // Вычисляем исключённые IPv4 CIDR: из '0.0.0.0/0' вычитаем IPv4 исключения
  const ipv4Excluded = excludeCidr("0.0.0.0/0", ipv4Exclusions);

  // Вычисляем исключённые IPv6 CIDR: из '::/0' вычитаем IPv6 исключения
  const ipv6Excluded = excludeCidr(["0.0.0.0/0", "::/0"], ipv6Exclusions);

  // Возвращаем кортеж с результатами
  return { ipv4Excluded, ipv6Excluded };
};
