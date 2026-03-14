
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,

    allowedHosts: ["4d44-105-8-5-218.ngrok-free.app"],
  },
});