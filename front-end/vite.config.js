import { defineConfig, loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode})=>{
	const env = loadEnv(mode, process.cwd(), "");
	return {
		
		plugins: [react()],
		define: {
			"import.meta.env.VITE_BACKEND_URL": JSON.stringify(env.VITE_BACKEND_URL),
		  },
		base: "/SimpleNotesApp/", // Must match the GitHub repo name
	}
})
