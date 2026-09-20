import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Это современная замена __dirname, рекомендованная для ESM
const root = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      // "@pages/*": fileURLToPath(new URL("./src/ui/pages", import.meta.url)),
      "@pages": path.resolve(root, "src/ui/pages"),
      "@widgets": path.resolve(root, "src/ui/widgets"),
      "@renderer-features": path.resolve(root, "src/ui/features"),
      "@renderer-shared": path.resolve(root, "src/ui/shared"),
      "@renderer": path.resolve(root, "src/ui"),
      "@shared": path.resolve(root, "src/shared"),
    },
  },
});
