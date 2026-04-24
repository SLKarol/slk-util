import { observer } from "mobx-react-lite";

import { useYaPlakalRuRootStore } from "@renderer/providers/ya-plakal/useYaplakalRootStore";
import { PrevNextDownload } from "@renderer/widgets/shared/ui";
import { generateUrl } from "@renderer/widgets/yaplakal/lib/helpers";

/**
 * Компонент для навигации по материалам ЯП
 */
export const YaPager = observer(() => {
  const {
    pager: { next, prev, current },
    selectMaterialStore: { url, setWorking },
    collection: { clearCollection },
  } = useYaPlakalRuRootStore();

  const onClickNext = () => {
    const nextPage = current + 1;
    clearCollection();
    setWorking(true);
    window.electronAPI.fetchYaPlakalTopic(generateUrl(url, nextPage));
  };

  const onClickPrev = () => {
    const prevPage = current - 1;
    clearCollection();
    setWorking(true);
    window.electronAPI.fetchYaPlakalTopic(generateUrl(url, prevPage));
  };

  return (
    <PrevNextDownload
      disabledNext={!next}
      disabledPrev={!prev}
      onClickNext={onClickNext}
      onClickPrev={onClickPrev}
    />
  );
});
YaPager.displayName = "YaPager";
