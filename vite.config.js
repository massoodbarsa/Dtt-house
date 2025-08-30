import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "node:path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "localhost",
    port: 8080, // 👈 force API-compatible port
  },
});
