import { ActionIcon, Tooltip } from "@mantine/core";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { useStihiRuRootStore } from "@renderer/providers/stihi-ru/useStihiRuRootStore";

interface Props {
  poemHref: string;
}

/**
 * Кнопка "Забанить/Разбанить автора"
 */
export const StihiRuButtonBanAuthor = observer(({ poemHref }: Props) => {
  const {
    stihiRuBanAuthrorsStore: { list, addOrRemoveBadAuthorByPoemHref },
    stihiRuPoemsStore: { poems },
  } = useStihiRuRootStore();

  const poem = poems.get(poemHref);
  const authorBanned = poem ? list.has(poem.authorId) : false;

  return (
    <Tooltip label={authorBanned ? "Разбанить" : "Забанить"}>
      <ActionIcon
        variant="transparent"
        aria-label="Settings"
        onClick={() => addOrRemoveBadAuthorByPoemHref(poemHref)}
      >
        {authorBanned ? (
          <IconThumbUp stroke={1.5} />
        ) : (
          <IconThumbDown stroke={1.5} />
        )}
      </ActionIcon>
    </Tooltip>
  );
});
StihiRuButtonBanAuthor.displayName = "StihiRuButtonBanAuthor";
