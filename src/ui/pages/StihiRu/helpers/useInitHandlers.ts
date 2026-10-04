import { useEffect } from "react";
import { notifications } from "@mantine/notifications";

import { getGroupPoemsFromHtmlString } from "@shared/lib/helpers/getGroupPoemsFromHtmlString";
import { parseStringToHTML } from "@shared/lib/helpers/parseStringToHTML";
import { type ReceiveText } from "@shared/lib/types/electron-api";

import { checkUrlStihiList } from "@renderer-features/stihi-ru/lib/checkUrlStihiList";
import { checkUrlStihiPoems } from "@renderer-features/stihi-ru/lib/checkUrlStihiPoems";
import { getPoemsListFromHtmlString } from "@renderer-features/stihi-ru/lib/getPoemsListFromHtmlString";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Инициализация обработчиков событий от главного процесса
 */
export const useInitHandlers = () => {
  const {
    listChaptersStore: { handleChaptersData },
    stihiRuPoemsStore: { handlePoemsData },
    stihiRuBanAuthorsStore: { loadArrayBadAuthors },
    stihiRuUiStore: { setBrowserProcessName },
    reactionPoems: {
      onReceiveSetting,
      onResponseOllamaModel,
      processOllamaModelListResponse,
    },
  } = useStihiRuRootStore();

  // Настроить обработчики событий запросов к сети
  useEffect(() => {
    window.electronAPI.fetchBanAuthors();
    window.electronAPI.fetchSettings();
    window.electronAPI.listInstalledOllamaModels();

    const unsubscribeOnReceiveText = window.electronAPI.onReceiveText(
      ({ requestParam, textContent }: ReceiveText) => {
        if (checkUrlStihiList(requestParam as string)) {
          handleChaptersData(
            getGroupPoemsFromHtmlString(parseStringToHTML(textContent)),
          );
        }
        if (checkUrlStihiPoems(requestParam as string)) {
          handlePoemsData(getPoemsListFromHtmlString(textContent));
        }
      },
    );
    const unsubscribeOnReceiveBanAuthors =
      window.electronAPI.onReceiveBanAuthors((authors) => {
        loadArrayBadAuthors(authors);
      });
    const unsubscribeOnReceiveSetting = window.electronAPI.onReceiveSetting(
      (settings) => {
        setBrowserProcessName(settings.browserProcessName);
        onReceiveSetting(settings);
      },
    );
    const unsubscribeOnReceiveOperationAuthor =
      window.electronAPI.onReceiveOperationAuthor(({ add, author }) => {
        notifications.show({
          title: add ? "Автор добавлен" : "Автор удалён",
          message: `${author} ${add ? "добавлен" : "удалён"} в(из) бан`,
        });
      });

    const unsubscribeOnResponseOllamaModel =
      window.electronAPI.responseOllamaModel((data) => {
        onResponseOllamaModel(data);
      });

    const unsubscribeOnResponseListOllamaModels =
      window.electronAPI.processOllamaModelListResponse((listModels) => {
        processOllamaModelListResponse(listModels);
      });

    return () => {
      unsubscribeOnReceiveText();
      unsubscribeOnReceiveBanAuthors();
      unsubscribeOnReceiveSetting();
      unsubscribeOnReceiveOperationAuthor();
      unsubscribeOnResponseOllamaModel();
      unsubscribeOnResponseListOllamaModels();
    };
  }, []);
};
