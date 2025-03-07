import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");  // Load all env variables

  console.log("✅ Loaded VITE_BACKEND_URL:", env.VITE_BACKEND_URL); // Debugging

  return {
    plugins: [react()],
    define: {
      "import.meta.env.VITE_BACKEND_URL": JSON.stringify(env.VITE_BACKEND_URL),
    },
	base:"/SimpleNotesApp/"
  };
});
