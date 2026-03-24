import { Button } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Кнопка входа для авторизации на сайте stihi.ru.
 *
 * @remarks
 * Отображает кнопку "Войти", которая отправляет данные формы через IPC-канал `fetchLogin`.
 * Кнопка отключена, если логин или пароль пустые (контролируется через `uiButtonDisabled`).
 * Использует MobX для реактивного обновления состояния.
 *
 * При нажатии формирует тело запроса и отправляет его вместе с заголовками и URL,
 * необходимыми для аутентификации на стороне сервера.
 */
export const StihiRuButtonLogin = observer(() => {
  const {
    stihiRuLoginStore: {
      uiButtonDisabled,
      settings: { login, password },
    },
  } = useStihiRuRootStore();

  const onClick = () => {
    const body: Record<string, string> = { block: "", login, password };

    window.electronAPI.fetchLogin({
      body,
      formName: "StihiRuLogin",
      headers: {
        Referer: "https://stihi.ru/login",
        Origin: "https://stihi.ru",
        Host: "stihi.ru",
      } as Record<string, string>,
      url: "https://stihi.ru/cgi-bin/login/intro.pl",
    });
  };

  return (
    <Button
      fullWidth
      mt="xl"
      radius="md"
      disabled={uiButtonDisabled}
      onClick={onClick}
    >
      Войти
    </Button>
  );
});
StihiRuButtonLogin.displayName = "StihiRuButtonLogin";
