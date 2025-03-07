import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/SimpleNotesApp/", // Must match the GitHub repo name
  plugins: [react()]
})
