import { type ChangeEventHandler, type MouseEventHandler } from "react";
import { observer } from "mobx-react-lite";
import { match, P } from "ts-pattern";

import { useRedditRootStore } from "@renderer/providers/reddit";
import {
  MEDIA_ACTION_COPY_LINK,
  MEDIA_ACTION_DOWNLOAD,
  MEDIA_ACTION_DOWNLOAD_SEND_TELEGRAM,
  MEDIA_ACTION_OPEN_IN_BROWSER,
  MEDIA_ACTION_TELEGRAM,
} from "@renderer/widgets/shared/lib/constants";
import { MediaResourceCard } from "@renderer/widgets/shared/ui";

export const RedditListMedia = observer(() => {
  const {
    toggleItemSelect,
    mediaRecords,
    redditCollection: {
      saveMedia,
      sendMediaToTelegram,
      openTopicInBrowser,
      copyUrlToClipBoard,
    },
  } = useRedditRootStore();

  /**
   * Обработчик клика по кнопке действия на карточке медиаресурса.
   *
   * Извлекает идентификатор элемента (`data-id`) и тип действия (`data-action`)
   * из атрибутов целевого элемента и определяет, что за действие выполнять.
   */
  const onClickAction: MouseEventHandler<HTMLButtonElement> = (mouseEvent) => {
    const dataId = mouseEvent.currentTarget.getAttribute("data-id");
    const dataAction = mouseEvent.currentTarget.getAttribute("data-action");

    match([dataAction, dataId])
      .with([MEDIA_ACTION_DOWNLOAD, P.string.minLength(1)], () => {
        saveMedia(dataId as string);
      })
      .with([MEDIA_ACTION_TELEGRAM, P.string.minLength(1)], () => {
        sendMediaToTelegram(dataId as string);
      })
      .with([MEDIA_ACTION_OPEN_IN_BROWSER, P.string.minLength(1)], () => {
        openTopicInBrowser(dataId as string);
      })
      .with([MEDIA_ACTION_COPY_LINK, P.string.minLength(1)], () => {
        copyUrlToClipBoard(dataId as string);
      })
      .with(
        [MEDIA_ACTION_DOWNLOAD_SEND_TELEGRAM, P.string.minLength(1)],
        () => {
          sendMediaToTelegram(dataId as string, true);
        },
      )
      .otherwise((): null => null);
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
      {mediaRecords.map(({ mediaRecord, selected }) => {
        return (
          <MediaResourceCard
            key={mediaRecord.id}
            mediaRecord={mediaRecord}
            onClickAction={onClickAction}
            onToggleSelect={onToggleSelect}
            selected={selected}
          />
        );
      })}
    </>
  );
});
RedditListMedia.displayName = "RedditListMedia";
