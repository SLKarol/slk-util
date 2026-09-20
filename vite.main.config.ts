import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import path from "node:path";

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      "@main": fileURLToPath(new URL("./src/main", import.meta.url)),
      "@shared": path.resolve(import.meta.dirname, "src/shared"),
    },
  },
});
