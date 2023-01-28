import { defineConfig } from "vite";

export default defineConfig({
  root: "./",
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets"
  },
  plugins: []
});