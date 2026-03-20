import { useEffect } from "react";
import { Flex } from "@mantine/core";

import { type ReceiveText } from "@shared/lib/types/electron-api";

import { StihiRuAddBan } from "@widgets/stihi-ru/ui/buttons/StihiRuAddBan";
import { StihiRuButtonGetRandom } from "@widgets/stihi-ru/ui/buttons/StihiRuButtonGetRandom";
import { StihiRuButtonLoadList } from "@widgets/stihi-ru/ui/buttons/StihiRuButtonLoadList";
import { StihiRuButtonLodSelected } from "@widgets/stihi-ru/ui/buttons/StihiRuButtonLodSelected";
import { StihiRuCalendar } from "@widgets/stihi-ru/ui/StihiRuCalendar";
import { StihiRuListLinks } from "@widgets/stihi-ru/ui/StihiRuListLinks";
import { StihiRuListListVerse } from "@widgets/stihi-ru/ui/StihiRuListListVerse";
import { StihiRuListRandomeNumber } from "@widgets/stihi-ru/ui/StihiRuListRandomeNumber";

import { checkUrlStihiList } from "@renderer-features/stihi-ru/lib/checkUrlStihiList";
import { getGroupListFromHtmlString } from "@renderer-features/stihi-ru/lib/getGroupListFromHtmlString";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

import styles from "./StihiRu.module.css";

/**
 * Страница работы со списком стихов
 */
export const StihiRu = () => {
  const {
    listChaptersStore: { handleChaptersData },
  } = useStihiRuRootStore();

  useEffect(() => {
    const unsubscribe = window.electronAPI.onReceiveText(
      ({ requestParam, textContent }: ReceiveText) => {
        if (checkUrlStihiList(requestParam as string)) {
          handleChaptersData(getGroupListFromHtmlString(textContent));
        }
      },
    );
    return unsubscribe;
  }, []);

  return (
    <div>
      <Flex>
        <div>
          <StihiRuCalendar />
          <StihiRuButtonLoadList />
        </div>
        <StihiRuListLinks />
      </Flex>
      <Flex gap="md" mt="lg">
        <StihiRuButtonGetRandom />
        <StihiRuButtonLodSelected />
      </Flex>
      <Flex>
        <StihiRuListRandomeNumber />
        <div className={styles.block}>
          <StihiRuListListVerse />
          <StihiRuAddBan />
        </div>
      </Flex>
    </div>
  );
};
