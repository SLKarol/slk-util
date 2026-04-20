import { observer } from "mobx-react-lite";

import { useYaPlakalRuRootStore } from "@renderer/providers/ya-plakal/useYaplakalRootStore";
import { PrevNextDownload } from "@renderer/widgets/shared/ui";

/**
 * Компонент для навигации по материалам ЯП
 */
export const YaPager = observer(() => {
  const {
    pager: { next, prev },
  } = useYaPlakalRuRootStore();

  return <PrevNextDownload disabledNext={!next} disabledPrev={!prev} />;
});
YaPager.displayName = "YaPager";
