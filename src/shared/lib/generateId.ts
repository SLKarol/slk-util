import { v4 as uuidv4 } from "uuid";

/**
 * Генерирует случайное 63‑битное число (чтобы избежать знаковых проблем)
 * Подходит для ID, nonce, токенов
 */
export function generateTruncatedUuid(): bigint {
  const uuid = uuidv4();
  // Убираем дефисы и берём первые 16 шестнадцатеричных символов
  const hex = uuid.replace(/-/g, "").substring(0, 16);
  return BigInt("0x" + hex);
}
