import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { MantineProvider } from "@mantine/core";

import { Routing } from "@pages/Routing";

/**
 * Точка входа в приложение
 */
export const App = () => {
  return (
    <MantineProvider>
      <Routing />
    </MantineProvider>
  );
};
