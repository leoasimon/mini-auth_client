import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     open: true,
//     port: 5173,
//     strictPort: true,
//     host: true,
//     origin: "http://0.0.0.0:5173",
//   },
//   build: {
//     outDir: "build",
//     sourcemap: true,
//   },
//   test: {
//     globals: true,
//     environment: "jsdom",
//     setupFiles: "src/setupTests",
//     mockReset: true,
//   },
// })

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
   port: 8080,
   strictPort: true,
  },
  server: {
   port: 8080,
   strictPort: true,
   host: true,
   origin: "http://0.0.0.0:8080",
  },
 });