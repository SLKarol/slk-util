import { type MouseEventHandler } from "react";
import { observer } from "mobx-react-lite";

import { useYaPlakalRuRootStore } from "@renderer/providers/ya-plakal/useYaplakalRootStore";
import { MediaResourceCardForPost } from "@renderer/widgets/shared/ui";

/**
 * Компонент отображения списка медиаресурсов, выбранных для публикации в разделе "Ya plakal".
 */
export const YaListPostMedia = observer(() => {
  const {
    itemsToSend: { mediaRecords, deleteItem },
  } = useYaPlakalRuRootStore();

  /**
   * Обработчик клика по кнопке действия на карточке медиаресурса.
   *
   * Определяет тип действия и идентификатор элемента через атрибуты `data-action` и `data-id`.
   */
  const onClickAction: MouseEventHandler<HTMLButtonElement> = (mouseEvent) => {
    const dataId = (mouseEvent.target as HTMLButtonElement).getAttribute(
      "data-id",
    );
    const dataAction = (mouseEvent.target as HTMLButtonElement).getAttribute(
      "data-action",
    );
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
YaListPostMedia.displayName = "YaListPostMedia";
