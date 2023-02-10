import { defineConfig } from "vite";
const { resolve } = require('path')
//Add env variable to check if is production or development

const env = process.env;
//Set a base route if deploying on github pages
env.mode = env.mode || "production";

console.log('Environment: ', env.mode); 

export default defineConfig({
  root: "./",
  //Add base route if deployiing on production
  base: env.mode === "production" ? "/calificaciones-trimestrales/" : "/",
  build: {
    outDir: "docs",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        trimestres: resolve(__dirname, 'trimestres.html'),
        login: resolve(__dirname, 'login.html'),
        calificaciones: resolve(__dirname, 'calificaciones.html')
      }
    }
  },
  plugins: []
});