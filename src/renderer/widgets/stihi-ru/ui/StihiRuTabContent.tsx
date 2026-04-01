import { observer } from "mobx-react-lite";

import {
  BANNED_TAB_NAME,
  ENTER_PAGE_TAB_NAME,
  MAIN_TAB_NAME,
} from "@renderer-features/stihi-ru/constants/tabs";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

import { StihiRuEnterPage } from "./EnterPage/StihiRuEnterPage";
import { StihiRuBanned } from "./StihiRuBanned";
import { StihiRuMain } from "./StihiRuMain";

/**
 * Компонент отображения содержимого активной вкладки виджета stihi.ru.
 */
export const StihiRuTabContent = observer(() => {
  const {
    stihiRuTabsStore: { selectedTab },
  } = useStihiRuRootStore();

  if (selectedTab === BANNED_TAB_NAME) return <StihiRuBanned />;
  if (selectedTab === MAIN_TAB_NAME) return <StihiRuMain />;
  if (selectedTab === ENTER_PAGE_TAB_NAME) return <StihiRuEnterPage />;

  return null;
});
StihiRuTabContent.displayName = "StihiRuTabContent";
