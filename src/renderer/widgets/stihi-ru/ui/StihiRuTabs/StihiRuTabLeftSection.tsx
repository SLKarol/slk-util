import { IconAlertTriangle, IconCircleCheck } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { SETTINGS_TAB_NAME } from "@renderer-features/stihi-ru/constants/tabs";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

import { type StihiRuTabLeftSectionProps } from "./StihiRuTabLeftSection.types";

/**
 * Вывод значка в табе логина
 */
export const StihiRuTabLeftSection = observer(
  ({ tabId }: StihiRuTabLeftSectionProps) => {
    const {
      stihiRuLoginStore: { isLoggedIn },
    } = useStihiRuRootStore();

    if (tabId !== SETTINGS_TAB_NAME) return null;

    if (isLoggedIn) return <IconCircleCheck />;

    return <IconAlertTriangle />;
  },
);
StihiRuTabLeftSection.displayName = "StihiRuTabLeftSection";
