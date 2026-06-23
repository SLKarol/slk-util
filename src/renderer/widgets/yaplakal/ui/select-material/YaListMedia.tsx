import { type ChangeEventHandler, type MouseEventHandler } from "react";
import { useClipboard } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { observer } from "mobx-react-lite";

import { useYaPlakalRuRootStore } from "@renderer/providers/ya-plakal/useYaplakalRootStore";
import {
  MEDIA_ACTION_COPY_LINK,
  MEDIA_ACTION_DOWNLOAD,
  MEDIA_ACTION_DOWNLOAD_SEND_TELEGRAM,
  MEDIA_ACTION_OPEN_IN_BROWSER,
  MEDIA_ACTION_TELEGRAM,
} from "@renderer/widgets/shared/lib/constants";
import { MediaResourceCard } from "@renderer/widgets/shared/ui";

/**
 * Компонент отображения списка медиаресурсов для выбора в разделе "Ya plakal".
 */
export const YaListMedia = observer(() => {
  const {
    mediaRecords,
    toggleItemSelect,
    collection: { sendMediaToTelegram, openTopicInBrowser },
  } = useYaPlakalRuRootStore();
  const clipboard = useClipboard({ timeout: 500 });

  /**
   * Обработчик клика по кнопке действия на карточке медиаресурса.
   *
   * Извлекает идентификатор элемента (`data-id`) и тип действия (`data-action`)
   * из атрибутов целевого элемента и определяет, что за действие выполнять.
   */
  const onClickAction: MouseEventHandler<HTMLButtonElement> = (mouseEvent) => {
    const dataId = mouseEvent.currentTarget.getAttribute("data-id");
    const dataAction = mouseEvent.currentTarget.getAttribute("data-action");
    if (dataAction === MEDIA_ACTION_DOWNLOAD && dataId) {
      window.electronAPI.saveMediaFile({ url: dataId });
      return;
    }
    if (dataAction === MEDIA_ACTION_TELEGRAM && dataId) {
      sendMediaToTelegram(dataId);
      return;
    }
    if (dataAction === MEDIA_ACTION_OPEN_IN_BROWSER && dataId) {
      openTopicInBrowser(dataId);
      return;
    }
    if (dataAction === MEDIA_ACTION_COPY_LINK && dataId) {
      clipboard.copy(dataId);
      notifications.show({ message: "Ссылка скопирована" });
    }
    if (dataAction === MEDIA_ACTION_DOWNLOAD_SEND_TELEGRAM && dataId) {
      sendMediaToTelegram(dataId, true);
      return;
    }
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
    dataId && toggleItemSelect(dataId);
  };

  return (
    <>
      {mediaRecords.map(({ mediaRecord, selected }) => (
        <MediaResourceCard
          key={mediaRecord.id}
          mediaRecord={mediaRecord}
          onClickAction={onClickAction}
          onToggleSelect={onToggleSelect}
          selected={selected}
        />
      ))}
    </>
  );
});
YaListMedia.displayName = "YaListMedia";
