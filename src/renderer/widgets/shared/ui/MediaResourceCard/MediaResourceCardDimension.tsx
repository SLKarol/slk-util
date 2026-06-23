import { Text } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { type MediaRecordStore } from "@renderer-features/model/media-record";

type Props = {
  /**
   * Объект медиазаписи, отображаемой на карточке.
   *
   * Содержит информацию о заголовке, URL, статусе выбора и наличии медиаресурсов.
   */
  mediaRecord: MediaRecordStore;
};

/**
 * Отобразить размеры медиа-ресурса
 */
export const MediaResourceCardDimension = observer(
  ({ mediaRecord: { height, width } }: Props) => {
    if (width && height)
      return (
        <Text size="sm">
          {width}x{height}
        </Text>
      );
    return null;
  },
);
MediaResourceCardDimension.displayName = "MediaResourceCardDimension";
