import { createErrorHandlers } from "@preload/lib/error/error-handler";
import { createMenuHandlers } from "@preload/lib/menu/menu-handlers.ts";
import { createMessagesHandlers } from "@preload/lib/messages/messages-handlers";
import { createRequestHandlers } from "@preload/lib/request/request-handlers";
import { createSettingsHandlers } from "@preload/lib/settings/settings-handlers";
import { createSettingsTunnelHandlers } from "@preload/lib/settings/settings-tunnel-handlers";
import { createStihiRuHandlers } from "@preload/lib/stihiru/stihiru-handlers";
import { createYaPlakalHandlers } from "@preload/lib/yaplakal/yaplakal-handlers";

export const menuAPI = createMenuHandlers();
export const requestsAPI = createRequestHandlers();
export const messagesAPI = createMessagesHandlers();
export const settingsAPI = createSettingsHandlers();
export const stihiRuAPI = createStihiRuHandlers();
export const tunnelAPI = createSettingsTunnelHandlers();
export const yapAPI = createYaPlakalHandlers();
export const errorAPI = createErrorHandlers();
