import { useEffect } from "react";
import { useInputState } from "@mantine/hooks";

/**
 * Хук для редактирования CSS-селектора для медиа-файлов Yap
 */
export const useEditSelectorMediaYap = () => {
  const [cssSelector, setCssSelector] = useInputState("");

  useEffect(() => {
    window.electronAPI.fetchSettings();

    const unsubscribeReceiveSetting = window.electronAPI.onReceiveSetting(
      (data) => {
        setCssSelector(data.selectorMediaYap);
      },
    );

    return () => {
      unsubscribeReceiveSetting();
    };
  }, []);

  const onClickSaveSelectorMediaYap = () => {
    window.electronAPI.saveSetting({
      key: "selectorMediaYap",
      settings: cssSelector,
    });
  };

  return { cssSelector, setCssSelector, onClickSaveSelectorMediaYap };
};
