import { Text } from "@mantine/core";

import { type MediaRecordUi } from "@renderer-shared/types/media";

type Props = {
  /**
   * Объект медиазаписи, отображаемой на карточке.
   *
   * Содержит информацию о заголовке, URL, статусе выбора и наличии медиаресурсов.
   */
  mediaRecord: MediaRecordUi;
};

/**
 * Отобразить размеры медиа-ресурса
 */
export const MediaResourceCardDimension = ({
  mediaRecord: { height, width },
}: Props) => {
  if (width && height)
    return (
      <Text size="sm">
        {width}x{height}
      </Text>
    );
  return null;
};
