import { Toolbar } from "@mantine/core";

import {
  OllamaToolbarRefresh,
  OllamaToolbarReload,
} from "./OllamaToolbarButtons";

/**
 * Обновить список ollama-models
 */
export const OllamaModelsToolbar = () => {
  return (
    <Toolbar withBorder={false}>
      <Toolbar.Toggle>
        <OllamaToolbarRefresh />
      </Toolbar.Toggle>
      <Toolbar.Toggle>
        <OllamaToolbarReload />
      </Toolbar.Toggle>
    </Toolbar>
  );
};
