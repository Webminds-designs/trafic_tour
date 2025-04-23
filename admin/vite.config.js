import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./", // ✅ VERY important for relative paths in cPanel

  plugins: [react(), tailwindcss()],

  server: {
    port: 5174, // (only affects local dev)
  },
});
