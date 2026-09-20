import { Text } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { formatDateFromString } from "@renderer-shared/lib";

import { type MediaRecordStore } from "@renderer-features/model/media-record";

interface Props {
  /**
   * Объект медиазаписи, отображаемой на карточке.
   */
  mediaRecord: MediaRecordStore;
}

/**
 * Карточка / Дата создания медиаресурса.
 */
export const MediaRecourceCarCreated = observer(({ mediaRecord }: Props) => {
  if (mediaRecord.created)
    return (
      <Text size="sm">
        {formatDateFromString(mediaRecord.created, "D MMMM YYYY, HH:mm")}
      </Text>
    );
  return null;
});
