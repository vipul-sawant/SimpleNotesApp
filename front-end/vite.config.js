import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ _ }) => {

  return {
    plugins: [react()],
	base:"/SimpleNotesApp/"
  };
});
