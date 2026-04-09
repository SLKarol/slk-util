import { Button, Container, Tooltip } from "@mantine/core";
import { observer } from "mobx-react-lite";

import { useWireGuardTunnelRootStore } from "@renderer/providers/wire-guard-tunnel/useWireGuardTunnelRootStore";

/**
 * Сабмит-кнопка формы настроек
 */
export const SettingsButtonRun = observer(() => {
  const {
    status: { isWorking },
  } = useWireGuardTunnelRootStore();
  return (
    <Container m={0}>
      <Tooltip label="Сохранить и запустить генерацию настроек">
        <Button type="submit" disabled={isWorking}>
          Сформировать строку
        </Button>
      </Tooltip>
    </Container>
  );
});
SettingsButtonRun.displayName = "SettingsButtonRun";
