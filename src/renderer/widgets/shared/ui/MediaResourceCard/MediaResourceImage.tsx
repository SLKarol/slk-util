import { Image } from "@mantine/core";

import { type MediaRecordUi } from "@renderer-shared/types/media";

type Props = {
  /**
   * Объект медиазаписи, отображаемой на карточке.
   */
  mediaRecord: MediaRecordUi;
};

/**
 * Компонент для отображения изображения медиаресурса.
 */
export const MediaResourceImage = ({
  mediaRecord: { title, url, preview },
}: Props) => {
  let src = url;
  if (!src && preview?.images?.length) {
    const [firstImage] = preview.images;
    src = firstImage.source.url;
  }
  return <Image src={src} title={title} w="100%" />;
};
