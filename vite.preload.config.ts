import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
    },
  },
});
