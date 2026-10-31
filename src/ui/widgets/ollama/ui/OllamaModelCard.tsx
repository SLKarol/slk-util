import {
  createTheme,
  Flex,
  Paper,
  Text,
  Stack,
  Group,
  Checkbox,
  Badge,
  MantineProvider,
} from "@mantine/core";
import {
  IconDatabase,
  IconCalendar,
  IconCpu,
  IconClock,
  IconCloudOff,
} from "@tabler/icons-react";

import { type ModelInfo } from "@renderer-features/ollama/lib/types";

import classes from "./OllamaModelCard.module.css";

interface Props {
  /**
   * Модель Ollama
   */
  model: Partial<ModelInfo>;
}

const theme = createTheme({
  cursorType: "pointer",
});

/**
 * Компонент для отображения карточки модели Ollama
 */
export const OllamaModelCard = ({ model }: Props) => {
  return (
    <Paper shadow="sm" p="sm" radius="md" withBorder>
      <Group justify="space-between" align="flex-start" mb="sm" wrap="nowrap">
        <Text fw={700} size="md" className={classes.title}>
          {model.name}
        </Text>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Checkbox label="Обновить" className={classes.checkbox} />
        </MantineProvider>
      </Group>

      <Stack gap="xs">
        {/* Бейджи с техническими характеристиками */}
        <Group gap={6}>
          {model.family && (
            <Badge variant="light" color="blue" size="sm" radius="sm" tt="none">
              {model.family}
            </Badge>
          )}
          {model.parameterSize && (
            <Badge
              variant="light"
              color="grape"
              size="sm"
              radius="sm"
              tt="none"
            >
              {model.parameterSize}
            </Badge>
          )}
          {model.quantizationLevel && (
            <Badge variant="light" color="teal" size="sm" radius="sm" tt="none">
              {model.quantizationLevel}
            </Badge>
          )}
        </Group>

        {/*  Основные метаданные (Размер и Дата) */}
        <Group gap="md" mt={4}>
          <Group gap={4} wrap="nowrap">
            <IconDatabase
              size={16}
              stroke={1.5}
              color="var(--mantine-color-dimmed)"
            />
            <Text size="sm" fw={500}>
              {model.size}
            </Text>
          </Group>
          <Group gap={4} wrap="nowrap">
            <IconCalendar
              size={16}
              stroke={1.5}
              color="var(--mantine-color-dimmed)"
            />
            <Text size="sm" c="dimmed">
              {model.modifiedAt}
            </Text>
          </Group>
        </Group>

        {/* Футер (VRAM и Время жизни) — вторичная информация */}
        <Flex gap="md" align="center">
          <Group gap={4} wrap="nowrap">
            <IconCpu size={14} color="var(--mantine-color-dimmed)" />
            <Text size="xs" c="dimmed">
              VRAM:{" "}
              <Text
                span
                c={model.sizeVram === "0 Bytes" ? "dimmed" : "blue.4"}
                inherit
              >
                {model.sizeVram}
              </Text>
            </Text>
          </Group>
          <Group gap={4} wrap="nowrap">
            {model.sizeVram !== "0 Bytes" ? (
              <IconClock size={14} color="var(--mantine-color-dimmed)" />
            ) : (
              <IconCloudOff size={14} color="var(--mantine-color-dimmed)" />
            )}
            <Text size="xs" c="dimmed">
              {model.expiresAt}
            </Text>
          </Group>
        </Flex>
      </Stack>
    </Paper>
  );
};
