import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/wallex": {
        target: "https://api.wallex.ir/",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wallex/, "")
      }
    }
  }
});
