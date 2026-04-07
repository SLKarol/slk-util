/**
 * Ожидает указанное количество секунд перед разрешением промиса.
 * Поддерживает отмену через сигнал `AbortSignal`.
 *
 * @param {number} [seconds=1] - Количество секунд для ожидания. По умолчанию 1 секунда.
 * @param {AbortSignal} [signal] - Сигнал, позволяющий отменить ожидание.
 * @returns {Promise<void>} Промис, который будет выполнен по истечении времени,
 *                          или отклонён при отмене сигнала.
 *
 * @example
 * // Ожидание 2 секунды
 * await wait(2);
 *
 * @example
 * // Ожидание с возможностью отмены
 * const controller = new AbortController();
 * setTimeout(() => controller.abort(), 500);
 * try {
 *   await wait(2, controller.signal);
 * } catch (error) {
 *   console.log(error.message); // "Ожидание отменено"
 * }
 */
export function wait(seconds = 1, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new Error("Ожидание отменено"));
      return;
    }

    const timer = setTimeout(() => {
      resolve();
    }, seconds * 1000);

    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new Error("Ожидание отменено"));
    });
  });
}

/**
 * Асинхронно ожидает случайное время с возможностью отмены через AbortSignal.
 *
 * Функция возвращает промис, который разрешается по истечении случайного времени,
 * вычисленного на основе переданного значения `randomTime` и указанной единицы измерения.
 * Поддерживает отмену операции ожидания через `AbortSignal`.
 *
 * @param {Object} params - Параметры функции ожидания.
 * @param {AbortSignal} [params.signal] - Сигнал для отмены ожидания. При получении сигнала отмены промис будет отклонён.
 * @param {number} params.randomTime - Временное значение, интерпретируемое в зависимости от параметра `unit`.
 * @param {"s" | "m"} [params.unit="s"] - Единица измерения времени: `"s"` — секунды (по умолчанию), `"m"` — минуты.
 *
 * @returns {Promise<void>} Промис, который разрешается через указанное время или отклоняется при отмене.
 *
 * @throws {Error} Выбрасывается с сообщением "Ожидание отменено", если операция была прервана через сигнал.
 *
 * @example
 * // Ожидание 2.5 секунд
 * await waitRandom({ randomTime: 2.5 });
 *
 * @example
 * // Ожидание до 3 минут с возможностью отмены
 * const controller = new AbortController();
 * setTimeout(() => controller.abort(), 1000);
 * try {
 *   await waitRandom({ randomTime: 3, unit: "m", signal: controller.signal });
 * } catch (e) {
 *   console.log(e.message); // "Ожидание отменено"
 * }
 */
export function waitRandom({
  signal,
  randomTime,
  unit = "s",
}: {
  signal?: AbortSignal;
  randomTime: number;
  unit?: "s" | "m";
}): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new Error("Ожидание отменено"));
      return;
    }

    const factor = unit === "m" ? 60000 : 1000;
    const delay = randomTime * factor;

    const timer = setTimeout(() => {
      resolve();
    }, delay);

    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new Error("Ожидание отменено"));
    });
  });
}
