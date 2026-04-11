import { type IPRange } from "@shared/lib/types/tunnel";

/**
 * Разделяет сетевые префиксы на IPv4 и IPv6 диапазоны.
 * @param prefixes - Набор префиксов сетей (например, '185.32.248.0/22', '2a00:bdc0:c000::/35').
 * @returns Объект IPRange с разделенными IPv4 и IPv6 префиксами.
 */
export const separatePrefixesByVersion = (prefixes: Set<string>): IPRange => {
  // Инициализируем массивы для IPv4 и IPv6 префиксов
  const ipv4: string[] = [];
  const ipv6: string[] = [];

  // Проходим по каждому префиксу и определяем версию IP
  for (const prefix of prefixes) {
    if (prefix.includes(".")) {
      // Префикс содержит точки — это IPv4
      ipv4.push(prefix);
    } else if (prefix.includes(":")) {
      // Префикс содержит двоеточия — это IPv6
      ipv6.push(prefix);
    }
    // Игнорируем префиксы, которые не содержат ни точек, ни двоеточий (невалидные)
  }

  // Возвращаем объект с разделенными префиксами
  return { ipv4, ipv6 };
};
