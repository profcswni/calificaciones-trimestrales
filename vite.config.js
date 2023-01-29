import { defineConfig } from "vite";
//Add env variable to check if is production or development
const env = process.env;

export default defineConfig({
  root: "./",
  //Add base route if deployiing on production
  base: env.mode === "production" ? "/calificaciones-trimestrales/" : "/",
  build: {
    outDir: "dist",
    assetsDir: "assets"
  },
  plugins: []
});