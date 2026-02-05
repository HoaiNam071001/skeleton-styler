import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "SkeletonStyler",
      fileName: (format) =>
        format === "es"
          ? "index.es.js"
          : format === "cjs"
          ? "index.cjs"
          : `index.${format}.js`,
    },
    rollupOptions: {
      external: [], // có thể thêm "vue", "react", ... nếu muốn external
    },
  },
  plugins: [
    dts({ insertTypesEntry: true }),
    libInjectCss(),
  ],
});
