import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    // SSR (prerender) derlemesinde paketler dışarıda kalır; parça bölme yalnız istemci için
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              router: ["react-router-dom"],
              motion: ["framer-motion"],
            },
          },
        },
  },
}));
