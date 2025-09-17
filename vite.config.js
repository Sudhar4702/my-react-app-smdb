import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  base: mode === "github" ? "/my-react-app-smdb/" : "/",
}));



