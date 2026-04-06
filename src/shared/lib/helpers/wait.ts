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
 * Ожидает случайное количество времени в заданном диапазоне.
 * Поддерживает миллисекунды и минуты как единицы измерения.
 * Отмена возможна через `AbortSignal`.
 *
 * @param {Object} params - Параметры функции.
 * @param {AbortSignal} [params.signal] - Сигнал для отмены ожидания.
 * @param {number} params.min - Минимальное значение случайного интервала (включительно).
 * @param {number} params.max - Максимальное значение случайного интервала (включительно).
 * @param {"s" | "m"} [params.unit="s"] - Единица измерения: "s" — секунды, "m" — минуты.
 * @returns {Promise<void>} Промис, который выполнится по истечении случайного времени,
 *                          или отклонится при отмене.
 *
 * @throws {Error} Если ожидание было отменено до завершения.
 *
 * @example
 * // Ожидание случайного времени от 1 до 3 секунд
 * await waitRandom({ min: 1, max: 3 });
 *
 * @example
 * // Ожидание от 1 до 2 минут
 * await waitRandom({ min: 1, max: 2, unit: "m" });
 *
 * @example
 * // С отменой через AbortSignal
 * const controller = new AbortController();
 * setTimeout(() => controller.abort(), 100);
 * try {
 *   await waitRandom({ min: 1, max: 5, signal: controller.signal });
 * } catch (error) {
 *   console.log(error.message); // "Ожидание отменено"
 * }
 */
export function waitRandom({
  signal,
  min,
  max,
  unit = "s",
}: {
  signal?: AbortSignal;
  min: number;
  max: number;
  unit?: "s" | "m";
}): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new Error("Ожидание отменено"));
      return;
    }

    const factor = unit === "m" ? 60000 : 1000;
    const randomTime = Math.floor(Math.random() * (max - min + 1)) + min;
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
