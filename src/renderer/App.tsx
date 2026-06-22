import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { Routing } from "@pages/Routing";

/**
 * Точка входа в приложение
 */
export const App = () => {
  return (
    <MantineProvider>
      <Notifications />
      <Routing />
    </MantineProvider>
  );
};
