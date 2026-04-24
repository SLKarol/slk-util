import { Title } from "@mantine/core";

import { ListMedia } from "@renderer/widgets/shared/ui";
import { YaListPostMedia } from "@renderer/widgets/yaplakal/ui/post-material";

/**
 * Списки выбранного для отправки
 */
export const YaPost = () => {
  return (
    <>
      <Title order={5}>Выбранное для отправки</Title>
      <ListMedia>
        <YaListPostMedia />
      </ListMedia>
    </>
  );
};
