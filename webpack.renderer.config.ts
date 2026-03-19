import path from "path";
import type { Configuration } from "webpack";

import { plugins } from "./webpack.plugins";
import { rules } from "./webpack.rules";

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    alias: {
      "@renderer": path.resolve(__dirname, "src/renderer"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@widgets": path.resolve(__dirname, "src/renderer/widgets"),
      "@pages": path.resolve(__dirname, "src/renderer/pages"),
      "@renderer-features": path.resolve(__dirname, "src/renderer/features"),
    },
  },
};
