import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "mid-cities": resolve(__dirname, "mid-cities/index.html"),
        casa: resolve(__dirname, "casa/index.html"),
        book: resolve(__dirname, "book/index.html"),
      },
    },
  },
});
