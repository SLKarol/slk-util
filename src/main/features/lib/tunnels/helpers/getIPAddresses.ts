import { type IpcMainEvent, net, type ResolveHostOptions } from "electron";

import { CHANNELS } from "@shared/ipc/channels";
import { type IPRange } from "@shared/lib/types/tunnel";

/**
 * Интерфейс для передачи данных в функцию получения IP-адресов.
 */
interface GetAddressPayload {
  /**
   * Доменное имя, для которого необходимо получить IP-адреса.
   */
  domain: string;
  /**
   * Тип DNS-запроса (например, "A" для IPv4 или "AAAA" для IPv6).
   */
  queryType: ResolveHostOptions["queryType"];
}

/**
 * Асинхронно получает IPv4 и IPv6 адреса для указанного домена.
 *
 * Функция выполняет DNS-запросы типов "A" и "AAAA" для переданного домена
 * с использованием модуля `net` из Electron. Результаты записываются в объект {@link IPRange}.
 * В случае ошибки отправляет сообщение об ошибке через IPC-канал.
 *
 * @returns {Promise<IPRange>} Объект, содержащий массивы IPv4 и IPv6 адресов.
 */
export async function getIPAddresses(
  domain: string,
  ipcMainEvent?: IpcMainEvent,
): Promise<IPRange> {
  const address: IPRange = { ipv4: [], ipv6: [] };
  try {
    address.ipv4 = await getAddress({ domain, queryType: "A" });
    address.ipv6 = await getAddress({ domain, queryType: "AAAA" });
  } catch (err) {
    ipcMainEvent?.reply(
      CHANNELS.SEND_POP_UP_ERROR,
      `Для ${domain} нет адресов или ошибка. ${(err as Error).message}`,
    );
    console.log(
      `On ${domain} no addresses or error: ${(err as Error).message}`,
    );
  }

  return address;
}

/**
 * Асинхронно разрешает доменное имя до списка IP-адресов указанного типа.
 *
 * Использует `net.resolveHost` из Electron для выполнения DNS-запроса.
 * Извлекает только IP-адреса из полученных конечных точек (endpoints).
 * @returns {Promise<string[]>} Массив строк с IP-адресами.
 */
async function getAddress({ domain, queryType }: GetAddressPayload) {
  const hostInfo = await net.resolveHost(domain, { queryType });
  return hostInfo.endpoints.map((endpoint) => endpoint.address);
}
