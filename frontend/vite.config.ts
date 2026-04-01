import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Next.js의 postcss.config.mjs 역할을 Vite 플러그인이 대체
  ],
  server: {
    proxy: {
      '/api':{
        target: 'http://localhost:8080', // 백 주소
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // @/* → src/* 경로 별칭
    },
  },
});
