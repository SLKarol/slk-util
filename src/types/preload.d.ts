import { ElectronAPI } from "@shared/lib/types/electron-api";

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
