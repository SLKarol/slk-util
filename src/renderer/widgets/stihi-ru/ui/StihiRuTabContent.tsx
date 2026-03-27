import { observer } from "mobx-react-lite";

import {
  BANNED_TAB_NAME,
  MAIN_TAB_NAME,
} from "@renderer-features/stihi-ru/constants/tabs";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

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

  return null;
});
StihiRuTabContent.displayName = "StihiRuTabContent";
