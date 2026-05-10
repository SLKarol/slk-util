import { Center, Checkbox } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useYaPlakalRuRootStore } from "@renderer/providers/ya-plakal/useYaplakalRootStore";

/**
 * Компонент чекбокса для управления отправкой подписей к картинкам на форуме ЯПлакал.ру.
 *
 * Данный компонент отображает чекбокс, позволяющий пользователю включить или отключить
 * отправку заголовков (подписей) вместе с прикрепляемыми изображениями при публикации сообщения.
 * Состояние управляется через хранилище MobX.
 */
export const YaDontSendTitle = observer(() => {
  const { sendTitle, setSendTitle } = useYaPlakalRuRootStore();
  return (
    <Center>
      <Checkbox
        label="Так же отправлять подписи к картинкам"
        checked={sendTitle}
        onChange={(mouseEvent) => {
          setSendTitle(mouseEvent.currentTarget.checked);
        }}
      />
    </Center>
  );
});
YaDontSendTitle.displayName = "YaDontSendTitle";
