import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // ✅ Add this if you're deploying to cPanel or subfolder
  base: "./", // Makes paths relative (important for cPanel)

  build: {
    minify: "terser",
    terserOptions: {
      format: {
        comments: false,
      },
    },
    outDir: "dist", // default, but useful to make sure
  },

  server: {
    fs: {
      strict: true,
    },
  },
});
