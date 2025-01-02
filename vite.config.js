import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
//    define:{
//    // env variable form .env file
//    'process.env.VITE_REACT_BASE_URL':JSON.stringify(process.env.VITE_REACT_BASE_URL)
//   }
})
