import { observer } from "mobx-react-lite";

import { useRedditRootStore } from "@renderer/providers/reddit";
import { MoreDownload } from "@renderer/widgets/shared/ui";

export const RedditMoreNews = observer(() => {
  const {
    redditReceiveNextRecords,
    redditUserSelectedStore: { after },
    busy,
  } = useRedditRootStore();

  return (
    <MoreDownload
      onClick={redditReceiveNextRecords}
      disabled={!after || busy}
    />
  );
});
RedditMoreNews.displayName = "RedditMoreNews";
