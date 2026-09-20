import { StihiRuTabContent } from "@renderer/widgets/stihi-ru/ui/StihiRuTabContent";
import { StihiRuTabs } from "@renderer/widgets/stihi-ru/ui/StihiRuTabs/StihiRuTabs";

import { useInitHandlers } from "./helpers/useInitHandlers";

/**
 * Страница работы со списком стихов
 */
export const StihiRu = () => {
  useInitHandlers();

  return (
    <>
      <StihiRuTabs />
      <StihiRuTabContent />
    </>
  );
};
