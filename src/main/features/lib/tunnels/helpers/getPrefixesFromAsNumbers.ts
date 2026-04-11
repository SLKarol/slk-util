import { net } from "electron";

import { type RIPEstatAnnouncedPrefixesResponse } from "../../types/tunnel-ipc";

// Базовый URL для API RIPEstat для получения объявленных префиксов
const RIPESTAT_BASE_URL =
  "https://stat.ripe.net/data/announced-prefixes/data.json?resource=AS";

/**
 * Получает уникальные сетевые префиксы для заданного набора номеров автономных систем (AS) с использованием API RIPEstat.
 * @param asNumbers - Набор номеров AS (например, {123, 456}).
 * @returns Promise, разрешающийся в Set уникальных префиксов (например, {"192.0.2.0/24"}).
 */
export const getPrefixesFromAsNumbers = async (asNumbers: Set<number>) => {
  // Инициализируем Set для хранения уникальных префиксов, избегая дубликатов
  const prefixes = new Set<string>();

  // Выполняем параллельные запросы для всех AS номеров с использованием Promise.allSettled для graceful обработки ошибок
  const resultPromises = await Promise.allSettled(
    Array.from(asNumbers).map(fetchPrefixesForAs),
  );

  // Обрабатываем успешные результаты: добавляем все префиксы в основной Set
  resultPromises.forEach((result) => {
    if (result.status === "fulfilled" && result.value) {
      result.value.forEach((prefix: string) => prefixes.add(prefix));
    }
  });

  return prefixes;
};

/**
 * Получает префиксы для одного номера AS из API RIPEstat.
 * @param asNumber - Номер AS для запроса.
 * @returns Массив префиксов или undefined в случае ошибки.
 */
const fetchPrefixesForAs = async (
  asNumber: number,
): Promise<string[] | undefined> => {
  const url = `${RIPESTAT_BASE_URL}${asNumber}`;

  try {
    // Делаем API запрос для получения объявленных префиксов для AS
    const response = await net.fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch prefixes for AS${asNumber}: ${response.statusText}`,
      );
    }

    const json: RIPEstatAnnouncedPrefixesResponse = await response.json();
    if (json.status !== "ok") {
      throw new Error(
        `API error: ${json.messages?.join(", ") || "Unknown error"}`,
      );
    }

    // Проверяем, не устарел ли endpoint API, и логируем предупреждение для мониторинга
    if (json.data_call_status === "deprecated") {
      console.warn(
        `⚠️ Endpoint ${json.data_call_name} v${json.version} deprecated!`,
      );
    }

    // Убеждаемся, что префиксы доступны; выбрасываем ошибку, если AS не анонсирует диапазоны
    if (!json.data?.prefixes?.length) {
      throw new Error("Prefixes not found or AS is not announcing ranges");
    }

    // Извлекаем и возвращаем список префиксов
    return json.data.prefixes.map((p) => p.prefix);
  } catch (error) {
    // Логируем ошибку и возвращаем undefined, чтобы Promise.allSettled мог продолжить обработку других AS номеров
    console.error(`Error fetching prefixes for AS${asNumber}:`, error);
  }
};
