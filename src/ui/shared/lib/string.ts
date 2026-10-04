import { type ExtractTagPayload } from "./string.types";

/**
 * Формирует правильную подпись к числу: N символ / символа / символов.
 *
 * @param count - число (может быть отрицательным или нулём)
 * @param forms - массив из 3 форм: [форма для 1, форма для 2–4, форма для 5+ и исключений 11–19]
 */
export function formatCount(
  count: number,
  forms: [string, string, string],
): string {
  const [one, few, many] = forms;

  // Для 0 и отрицательных чисел используем форму «много» (можно адаптировать под задачу)
  if (count === 0 || count < 0) {
    return `${count} ${many}`;
  }

  const abs = Math.abs(count);
  const lastDigit = abs % 10;
  const lastTwoDigits = abs % 100;

  // Числа 11–19 всегда используют форму «много»
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${count} ${many}`;
  }

  // 1 → форма «один»
  if (lastDigit === 1) {
    return `${count} ${one}`;
  }

  // 2–4 → форма «несколько»
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} ${few}`;
  }

  // Остальные (5–9, 0 и т. д.) → форма «много»
  return `${count} ${many}`;
}

/**
 * Извлекает текст из HTML-тега.
 *
 * @param payload - объект с тегом и текстом
 * @returns текст внутри HTML-тега или null, если тег не найден
 */
export const extractTag = ({ tag, text }: ExtractTagPayload) => {
  const match = text.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match ? match[1] : null;
};
