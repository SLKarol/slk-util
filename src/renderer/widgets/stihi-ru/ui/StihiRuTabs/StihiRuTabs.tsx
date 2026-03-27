import { Tabs } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

import styles from "./StihiRuTabs.module.css";

/**
 * Табы на странице стихов
 */
export const StihiRuTabs = observer(() => {
  const {
    stihiRuTabsStore: { selectedTab, tabsArray, setSelectedTab },
  } = useStihiRuRootStore();

  return (
    <Tabs value={selectedTab} onChange={setSelectedTab}>
      <Tabs.List>
        {tabsArray.map((stihiRuTab) => (
          <Tabs.Tab key={stihiRuTab.id} value={stihiRuTab.id}>
            <span
              className={styles.tab}
              title={
                stihiRuTab.title.length > 10 ? stihiRuTab.title : undefined
              }
            >
              {stihiRuTab.title}
            </span>
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
});
StihiRuTabs.displayName = "StihiRuTabs";
