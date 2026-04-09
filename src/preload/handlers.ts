import { createMenuHandlers } from "@preload/lib/menu/menu-handlers.ts";
import { createMessagesHandlers } from "@preload/lib/messages/messages-handlers";
import { createRequestHandlers } from "@preload/lib/request/request-handlers";
import { createSettingsHandlers } from "@preload/lib/settings/settings-handlers";
import { createSettingsTunnelHandlers } from "@preload/lib/settings/settings-tunnel-handlers";
import { createStihiRuHandlers } from "@preload/lib/stihiru/stihiru-handlers";

export const menuAPI = createMenuHandlers();
export const requestsAPI = createRequestHandlers();
export const messagesAPI = createMessagesHandlers();
export const settingsAPI = createSettingsHandlers();
export const stihiRuAPI = createStihiRuHandlers();
export const tunnelAPI = createSettingsTunnelHandlers();
