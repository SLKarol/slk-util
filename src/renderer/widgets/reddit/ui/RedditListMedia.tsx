import { type ChangeEventHandler, type MouseEventHandler } from "react";
import { observer } from "mobx-react-lite";

import { useRedditRootStore } from "@renderer/providers/reddit";
import { MediaResourceCard } from "@renderer/widgets/shared/ui";

export const RedditListMedia = observer(() => {
  const { mediaRecords } = useRedditRootStore();

  /**
   * Обработчик клика по кнопке действия на карточке медиаресурса.
   *
   * Извлекает идентификатор элемента (`data-id`) и тип действия (`data-action`)
   * из атрибутов целевого элемента и определяет, что за действие выполнять.
   */
  const onClickAction: MouseEventHandler<HTMLButtonElement> = (mouseEvent) => {
    const dataId = mouseEvent.currentTarget.getAttribute("data-id");
    const dataAction = mouseEvent.currentTarget.getAttribute("data-action");
  };

  /**
   * Обработчик изменения состояния чекбокса выбора элемента.
   *
   * При переключении чекбокса извлекает `data-id` и передаёт его в метод `toggleItemSelect`,
   * который управляет добавлением/удалением элемента из списка отправки.
   */
  const onToggleSelect: ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = (changeEvent) => {
    const dataId = changeEvent.target.getAttribute("data-id");
    // dataId && toggleItemSelect(dataId);
  };

  return (
    <>
      {mediaRecords.map((mediaRecord) => (
        <MediaResourceCard
          key={mediaRecord.id}
          mediaRecord={mediaRecord}
          onClickAction={onClickAction}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </>
  );
});
RedditListMedia.displayName = "RedditListMedia";
