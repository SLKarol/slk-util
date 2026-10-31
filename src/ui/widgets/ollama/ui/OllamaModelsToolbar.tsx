import { Toolbar } from "@mantine/core";

import {
  OllamaToolbarCheckAll,
  OllamaToolbarRefresh,
  OllamaToolbarReload,
} from "./OllamaToolbarButtons";

import classes from "./OllamaModelsToolbar.module.css";

/**
 * Тулбар для списка моделей ollama
 */
export const OllamaModelsToolbar = () => {
  return (
    <Toolbar withBorder={false} className={classes.toolbar}>
      <OllamaToolbarRefresh />
      <OllamaToolbarCheckAll />
      <Toolbar.Divider m="4px" />
      <Toolbar.Toggle>
        <OllamaToolbarReload />
      </Toolbar.Toggle>
    </Toolbar>
  );
};
