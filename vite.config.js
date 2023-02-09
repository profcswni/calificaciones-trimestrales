import { defineConfig } from "vite";
//Add env variable to check if is production or development

const env = process.env;
//Set a base route if deploying on github pages
env.mode = env.mode || "production";

console.log('Environment: ', env.mode); 

export default defineConfig({
  root: "./sistemas-2022-2027",
  //Add base route if deployiing on production
  //calificaciones-trimestrales
  base: env.mode === "production" ? "/" : "/",
  build: {
    outDir: "public",
    assetsDir: "assets"
  },
  plugins: []
});