/**
 * Интерфейс, описывающий размеры изображения.
 */
interface ImageSize {
  /**
   * Ширина изображения в пикселях.
   */
  width: number;

  /**
   * Высота изображения в пикселях.
   */
  height: number;
}

/**
 * Асинхронная функция для получения размеров изображения из Data URL.
 *
 * Создаёт временный объект `Image`, загружает в него данные по переданному Data URL
 * и возвращает промис с шириной и высотой изображения после успешной загрузки.
 */
export function getImageSizeFromDataURL(dataURL: string): Promise<ImageSize> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = (err) =>
      reject(new Error("Ошибка загрузки изображения: " + err));
    img.src = dataURL;
  });
}
