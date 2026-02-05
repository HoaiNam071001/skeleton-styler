import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  build: {
    minify: false, 

    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "SkeletonStyler", 
      formats: ["umd"], 
      fileName: () => "skeleton-styler.js",
    },
    rollupOptions: {
      external: [], 
    },
  },
  plugins: [
    dts({ insertTypesEntry: true }),
    libInjectCss(),
  ],
});