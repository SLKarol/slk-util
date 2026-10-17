import { observer } from "mobx-react-lite";
import { Textarea } from "@mantine/core";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

/**
 * Ввод своих мысле по поводу прочитанного текста.
 */
export const MyMind = observer(() => {
  const {
    reactionPoems: { myIdea, setMyIdea },
  } = useStihiRuRootStore();

  return (
    <Textarea
      label="Моя мысль по всему прочитанному тексту"
      placeholder="Моя мысль по всему прочитанному тексту. Не обязательный элемент."
      rows={6}
      w="100%"
      value={myIdea}
      onChange={(inputEvent) => setMyIdea(inputEvent.target.value)}
    />
  );
});
MyMind.displayName = "MyMind";
