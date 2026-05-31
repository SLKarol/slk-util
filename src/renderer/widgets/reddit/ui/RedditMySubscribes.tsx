import { useState } from "react";
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

/**
 * Компонент выбора каналов, на которые подписан пользователь.
 */
export const RedditMySubscribes = observer(() => {
  const {
    redditSubscribeStore: { listSubscribes, working },
    redditSelectedStore: { selectedRedditChannel, setSelectedRedditChannel },
  } = useRedditRootStore();

  const [searchValue, setSearchValue] = useState("");
  const [prevSearchValue, setPrevSearchValue] = useState("");

  const renderOption: SelectProps["renderOption"] = ({ option, checked }) => (
    <Group flex="1" gap="xs">
      {option.label} ({option.value})
      {listSubscribes.find((channel) => channel.title === option.value)
        ?.over18 && <IconRating18Plus />}
      {checked && (
        <IconCheck style={{ marginInlineStart: "auto" }} {...iconProps} />
      )}
    </Group>
  );

  return (
    <Select
      searchable
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      clearable
      onClear={() => {
        setSearchValue(prevSearchValue);
      }}
      label="Каналы, на которые я подписан"
      description="Чтобы вернуться к поиску, нажми 'Очистить выбранное'"
      disabled={working}
      data={listSubscribes.map((channel) => ({
        label: channel.title,
        value: channel.id,
      }))}
      value={selectedRedditChannel || undefined}
      onChange={(selectedValue) => {
        setPrevSearchValue(searchValue);
        setSelectedRedditChannel(selectedValue);
      }}
      renderOption={renderOption}
      maxDropdownHeight={DROPDOWN_MAX_HEIGHT}
      nothingFoundMessage="Не найдено..."
    />
  );
});
RedditMySubscribes.displayName = "RedditMySubscribes";
