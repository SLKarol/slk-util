import {
  RedditCountSelected,
  RedditToolbarSelected,
} from "@renderer/widgets/reddit/ui/post";

/**
 * Списки выбранного для отправки
 */
export const RedditPost = () => {
  return (
    <>
      <RedditCountSelected />
      <RedditToolbarSelected />
    </>
  );
};
