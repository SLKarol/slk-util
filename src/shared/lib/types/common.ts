/**
 * Интерфейс для объекта с ключами типа string и значениями типа string
 */
export interface IObjectStringValue {
  [K: string]: string;
}

/**
 * Обобщённый тип, позволяющий значению быть либо типом T, либо null.
 * Используется для явного указания опциональности значения через null.
 */
export type Nullable<T> = T | null;
