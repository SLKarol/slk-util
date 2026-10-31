import { Toolbar } from "@mantine/core";

import {
  OllamaToolbarCheckAll,
  OllamaToolbarRefresh,
  OllamaToolbarReload,
} from "./OllamaToolbarButtons";

import classes from "./OllamaModelsToolbar.module.css";

/**
 * Обновить список ollama-models
 */
export const OllamaModelsToolbar = () => {
  return (
    <Toolbar withBorder={false} className={classes.toolbar}>
      <Toolbar.Toggle>
        <OllamaToolbarRefresh />
      </Toolbar.Toggle>
      <Toolbar.Toggle>
        <OllamaToolbarCheckAll />
      </Toolbar.Toggle>
      <Toolbar.Divider m="4px" />
      <Toolbar.Toggle>
        <OllamaToolbarReload />
      </Toolbar.Toggle>
    </Toolbar>
  );
};
