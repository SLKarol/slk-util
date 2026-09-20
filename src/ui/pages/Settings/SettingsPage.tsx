import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";

import { SettingsMenu } from "@renderer/widgets/settings/ui";

import { SettingsHello } from "./SettingsHello";

import styles from "./SettingsPage.module.css";

/**
 * Настройка
 */
export const SettingsPage = () => {
  return (
    <AppShell navbar={{ width: 300, breakpoint: "sm" }}>
      <AppShell.Navbar p="xs">
        <SettingsMenu />
      </AppShell.Navbar>
      <AppShell.Main>
        <div className={styles.content}>
          <SettingsHello />
          <Outlet />
        </div>
      </AppShell.Main>
    </AppShell>
  );
};
