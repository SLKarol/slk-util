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
