import { useEffect } from "react";

import { type ReceiveText } from "@shared/lib/types/electron-api";

import { checkUrlStihiList } from "@renderer-features/stihi-ru/lib/checkUrlStihiList";
import { checkUrlStihiPoems } from "@renderer-features/stihi-ru/lib/checkUrlStihiPoems";
import { getGroupListFromHtmlString } from "@renderer-features/stihi-ru/lib/getGroupListFromHtmlString";
import { getPoemsListFromHtmlString } from "@renderer-features/stihi-ru/lib/getPoemsListFromHtmlString";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";
import { StihiRuTabContent } from "@renderer/widgets/stihi-ru/ui/StihiRuTabContent";
import { StihiRuTabs } from "@renderer/widgets/stihi-ru/ui/StihiRuTabs/StihiRuTabs";

/**
 * Страница работы со списком стихов
 */
export const StihiRu = () => {
  const {
    listChaptersStore: { handleChaptersData },
    stihiRuPoemsStore: { handlePoemsData },
    stihiRuBanAuthrorsStore: { loadArrayBadAuthors },
    stihiRuUiStore: { setBrowserProcessName },
  } = useStihiRuRootStore();

  // Настроить обработчики событий запросов к сети
  useEffect(() => {
    const unsubscribe = window.electronAPI.onReceiveText(
      ({ requestParam, textContent }: ReceiveText) => {
        if (checkUrlStihiList(requestParam as string)) {
          handleChaptersData(getGroupListFromHtmlString(textContent));
        }
        if (checkUrlStihiPoems(requestParam as string)) {
          handlePoemsData(getPoemsListFromHtmlString(textContent));
        }
      },
    );
    return unsubscribe;
  }, []);

  // Настроить обработчики событий загрузки забаненных авторов
  useEffect(() => {
    window.electronAPI.fetchBanAuthors();

    const unsubscribe = window.electronAPI.onReceiveBanAuthors((authors) => {
      loadArrayBadAuthors(authors);
    });
    return unsubscribe;
  }, []);

  // Настроить обработчики событий загрузки настроек
  useEffect(() => {
    window.electronAPI.fetchSettings();

    const unsubscribe = window.electronAPI.onReceiveSetting((settings) => {
      setBrowserProcessName(settings.browserProcessName);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <StihiRuTabs />
      <StihiRuTabContent />
    </>
  );
};
