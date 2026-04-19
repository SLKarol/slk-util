import type { HTMLElement } from "node-html-parser";

import { type HasPrevNextPage } from "../../../../shared/lib/types/htmlPageInfo";

/**
 * Извлекает информацию о наличии предыдущей/следующей страницы и текущем номере страницы
 * из HTML-структуры страницы Yaplakal.
 *
 * @param {HTMLElement} rootPage - Корневой элемент HTML-дерева страницы.
 * @returns {HasPrevNextPage} Объект с булевыми флагами `next` и `prev`, а также номером текущей страницы.
 */
export function getPageInfo(rootPage: HTMLElement): HasPrevNextPage {
  // Получить элемент с постраничным листанием
  const pager = rootPage.querySelector("td.pager");
  if (!pager) {
    return { next: false, prev: false, current: 0 };
  }

  // Получить текущую страницу из span.pager-current
  const currentElement = pager.querySelector("span.pager-current");
  if (!currentElement) {
    return { next: false, prev: false, current: 0 };
  }

  const currentPageNumber = Number.parseInt(
    currentElement.rawText.replace(/[^\d]/g, ""),
    10,
  );
  if (Number.isNaN(currentPageNumber)) {
    return { next: false, prev: false, current: 0 };
  }

  // Проверить слева: ближайший элемент слева — ссылка с текстом "Страницы:"?
  const prevElement = currentElement.previousElementSibling;
  const hasPageJumpLeft =
    prevElement?.tagName.toLowerCase() === "a" &&
    prevElement.rawText.includes("Страницы:");

  if (hasPageJumpLeft) {
    // Первая страница
    return {
      current: 1,
      next: true,
      prev: false,
    };
  }

  // Проверить справа: есть ли a.go-last-btn
  const nextElement = currentElement.nextElementSibling;
  const className = nextElement?.getAttribute("class") || "";
  if (className.includes("go-last-btn")) {
    return {
      current: currentPageNumber,
      next: false,
      prev: true,
    };
  }

  // Иначе (промежуточная или единственная страница)
  return {
    current: currentPageNumber,
    next: true,
    prev: true,
  };
}
