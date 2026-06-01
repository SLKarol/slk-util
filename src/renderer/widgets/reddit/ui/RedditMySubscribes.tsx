import { Group, Select, type SelectProps } from "@mantine/core";
import { IconCheck, IconRating18Plus } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";

import { DROPDOWN_MAX_HEIGHT } from "@renderer-shared/lib";

import { useRedditRootStore } from "@renderer/providers/reddit";

const iconProps = {
  color: "currentColor",
  opacity: 0.6,
  size: 18,
};

interface RedditMySubscribesProps {
  className?: string;
}

/**
 * Компонент выбора каналов, на которые подписан пользователь.
 */
export const RedditMySubscribes = observer(
  ({ className }: RedditMySubscribesProps) => {
    const {
      findRedditChannels,
      redditSubscribeStore: { working },
      redditSelectedStore: { selectedRedditChannel, setSelectedRedditChannel },
    } = useRedditRootStore();

    // 1. Создаем маппинг id -> over18 внутри observer-компонента
    const over18Map = new Map(
      findRedditChannels.map((channel) => [channel.id, channel.over18]),
    );

    const renderOption: SelectProps["renderOption"] = ({ option, checked }) => (
      <Group flex="1" gap="xs">
        {option.label} ({option.value})
        {over18Map.get(option.value) && <IconRating18Plus />}
        {checked && (
          <IconCheck style={{ marginInlineStart: "auto" }} {...iconProps} />
        )}
      </Group>
    );

    return (
      <Select
        label="Каналы, на которые я подписан"
        description="Чтобы вернуться к поиску, нажми 'Очистить выбранное'"
        disabled={working}
        data={findRedditChannels.map((channel) => ({
          label: channel.title,
          value: channel.id,
        }))}
        value={selectedRedditChannel || undefined}
        onChange={setSelectedRedditChannel}
        renderOption={renderOption}
        maxDropdownHeight={DROPDOWN_MAX_HEIGHT}
        className={className}
        nothingFoundMessage="Не найдено..."
      />
    );
  },
);
RedditMySubscribes.displayName = "RedditMySubscribes";
