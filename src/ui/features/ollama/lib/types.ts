export interface ModelInfo {
  /** Имя модели  */
  name: string;
  /** Дата последнего изменения */
  modifiedAt: string;
  /** Общий размер на диске */
  size: string;
  /** Семейство */
  family: string;
  /** размер параметров */
  parameterSize: string;
  /** Уровень квантизации */
  quantizationLevel: string;
  /** Через сколько истекает время активности */
  expiresAt: string;
  /** Объём памяти, который модель занимает в видеопамяти (VRAM) в данный момент. */
  sizeVram: string;
}
