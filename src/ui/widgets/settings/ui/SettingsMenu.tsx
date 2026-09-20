import { Stack } from "@mantine/core";
import { Link, useParams } from "react-router-dom";

import { SETTINGS_MENU } from "../lib/constants";

import styles from "./SettingsMenu.module.css";

export const SettingsMenu = () => {
  const { setting = "" } = useParams();

  return (
    <Stack gap="xs">
      {SETTINGS_MENU.map(({ label, link }) => (
        <Link
          key={link}
          className={styles.link}
          data-active={link === setting ? true : undefined}
          to={link}
        >
          {label}
        </Link>
      ))}
    </Stack>
  );
};
