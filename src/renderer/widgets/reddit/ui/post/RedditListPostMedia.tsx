import { type MouseEventHandler } from "react";
import { observer } from "mobx-react-lite";

import { useRedditRootStore } from "@renderer/providers/reddit";
import { MediaResourceCardForPost } from "@renderer/widgets/shared/ui";

export const RedditListPostMedia = observer(() => {
  const {
    itemsToSend: { mediaRecords, deleteItem },
  } = useRedditRootStore();

  /**
   * Обработчик клика по кнопке действия на карточке медиаресурса.
   *
   * Определяет тип действия и идентификатор элемента через атрибуты `data-action` и `data-id`.
   */
  const onClickAction: MouseEventHandler<HTMLButtonElement> = (mouseEvent) => {
    const dataId = mouseEvent.currentTarget.getAttribute("data-id");
    const dataAction = mouseEvent.currentTarget.getAttribute("data-action");

    if (dataId && dataAction === "delete") {
      deleteItem(dataId);
      return;
    }
  };

  return (
    <>
      {mediaRecords.map((mediaRecord) => (
        <MediaResourceCardForPost
          key={mediaRecord.id}
          mediaRecord={mediaRecord}
          onClickAction={onClickAction}
        />
      ))}
    </>
  );
});
RedditListPostMedia.displayName = "RedditListPostMedia";
