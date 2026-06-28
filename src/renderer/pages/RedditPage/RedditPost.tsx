import { SelectHoliday } from "@renderer/widgets/holidays/ui";
import {
  RedditCountSelected,
  RedditListPostMedia,
  RedditToolbarSelected,
} from "@renderer/widgets/reddit/ui/post";
import { ListMedia } from "@renderer/widgets/shared/ui";

/**
 * Списки выбранного для отправки
 */
export const RedditPost = () => {
  return (
    <>
      <RedditCountSelected />
      <SelectHoliday />
      <RedditToolbarSelected />
      <ListMedia>
        <RedditListPostMedia />
      </ListMedia>
    </>
  );
};
