import { type MouseEventHandler } from "react";
import { CloseButton, Tabs } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

import { StihiRuTabLeftSection } from "./StihiRuTabLeftSection";

import styles from "./StihiRuTabs.module.css";

/**
 * Табы в модуле стихов
 */
export const StihiRuTabs = observer(() => {
  const {
    stihiRuTabsStore: { closeTab, selectedTab, tabsArray, setSelectedTab },
  } = useStihiRuRootStore();

  const onClickDetele: MouseEventHandler<HTMLButtonElement> = (mouseEvent) => {
    const id = mouseEvent.currentTarget.dataset.id;
    closeTab(id);
  };

  return (
    <Tabs value={selectedTab} onChange={setSelectedTab}>
      <Tabs.List>
        {tabsArray.map((stihiRuTab) => (
          <Tabs.Tab
            key={stihiRuTab.id}
            value={stihiRuTab.id}
            rightSection={
              !stihiRuTab.readonly && (
                <CloseButton
                  size="xs"
                  data-id={stihiRuTab.id}
                  onClick={onClickDetele}
                  tabIndex={-1}
                />
              )
            }
            leftSection={<StihiRuTabLeftSection tabId={stihiRuTab.id} />}
          >
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
