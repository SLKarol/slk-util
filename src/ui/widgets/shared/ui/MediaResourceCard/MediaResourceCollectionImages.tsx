import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { type Nullable } from "@shared/lib/types/common";
import { type MediaAlbum } from "@shared/lib/types/media";

interface Props {
  collection: Nullable<MediaAlbum>;
}

/**
 * Выводит коллекцию изображений в виде карусели.
 */
export const MediaResourceCollectionImages = observer(
  ({ collection }: Props) => {
    if (!collection) return null;

    return (
      <Carousel withIndicators height="100%">
        {Object.keys(collection).map((keyOfCollection) => (
          <Carousel.Slide key={keyOfCollection}>
            <Image src={collection[keyOfCollection].data} w="100%" />
          </Carousel.Slide>
        ))}
      </Carousel>
    );
  },
);
MediaResourceCollectionImages.displayName = "MediaResourceCollectionImages";
