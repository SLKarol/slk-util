/**
 * Проверка URL списка произведений на соответствие формату
 * @param urlString проверяемый URL
 */
export const checkUrlStihiList = (urlString: string) => {
  try {
    const url = new URL(urlString);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "stihi.ru" ||
      url.pathname !== "/poems/list.html"
    ) {
      return false;
    }
    const params = url.searchParams;
    // Проверяем наличие всех обязательных параметров
    if (params.get("topic") !== "all") return false;
    if (!/^\d{4}$/.test(params.get("year") ?? "")) return false;
    if (!/^\d{1,2}$/.test(params.get("month") ?? "")) return false;
    if (!/^\d{1,2}$/.test(params.get("day") ?? "")) return false;

    // Если нужна строгость (только эти параметры):
    const allowedKeys = ["topic", "year", "month", "day"];
    return Array.from(params.keys()).every((key) => allowedKeys.includes(key));
  } catch {
    return false;
  }
};
