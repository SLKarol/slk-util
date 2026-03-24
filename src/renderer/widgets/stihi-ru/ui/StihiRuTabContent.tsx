import { observer } from "mobx-react-lite";

import {
  MAIN_TAB_NAME,
  SETTINGS_TAB_NAME,
} from "@renderer-features/stihi-ru/constants/tabs";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

import { StihiRuLogin } from "./StihiRuLogin";
import { StihiRuMain } from "./StihiRuMain";

/**
 * Компонент отображения содержимого активной вкладки виджета stihi.ru.
 */
export const StihiRuTabContent = observer(() => {
  const {
    stihiRuTabsStore: { selectedTab },
  } = useStihiRuRootStore();

  if (selectedTab === MAIN_TAB_NAME) return <StihiRuMain />;
  if (selectedTab === SETTINGS_TAB_NAME) return <StihiRuLogin />;

  return <div>StihiRuTabContent</div>;
});
StihiRuTabContent.displayName = "StihiRuTabContent";
