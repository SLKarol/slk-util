import { net } from "electron";

/**
 * Получает информацию об автономной системе (ASN) для указанного IP-адреса с использованием сервиса ipinfo.io.
 *
 * @param {string} ip - IP-адрес (IPv4 или IPv6), для которого необходимо получить информацию об ASN.
 * @returns {Promise<string | null>} Возвращает строку с информацией об организации (например, "AS54113 Fastly, Inc."),
 */
async function getASNWithIPinfo(ip: string): Promise<string | null> {
  try {
    const response = await net.fetch(`https://ipinfo.io/${ip}/json`);
    const data = await response.json();
    return data.org || null;
  } catch (error) {
    console.error("IPinfo error:", error);
    return null;
  }
}

/**
 * Определяет ASN (Autonomous System Number) для списка IP-адресов, последовательно проверяя каждый адрес
 * через внешний API (ipinfo.io). Возвращает первый успешный результат.
 *
 * Используется для определения автономной системы, которой принадлежит один из IP-адресов домена,
 * что может быть полезно при настройке сетевых правил (например, исключение трафика по ASN из VPN).
 *
 * @param {string[]} ips - Массив IP-адресов, для которых выполняется поиск ASN.
 * @returns {Promise<string | null>} Возвращает строку с информацией об ASN (например, "AS54113 Fastly, Inc."),
 *                                   либо `null`, если ни по одному из адресов данные не получены.
 * @remarks
 * Функция останавливается на первом IP-адресе, для которого удалось получить данные об ASN.
 * Ошибки при запросах подавляются — в случае проблем возвращается `null`.
 */
export async function resolveASNForIPs(ips: string[]): Promise<string | null> {
  try {
    for (const ip of ips) {
      const asn = await getASNWithIPinfo(ip);
      if (asn) return asn;
    }
    return null;
  } catch (error) {
    return null;
  }
}
