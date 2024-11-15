import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})


const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow connections from the React app
    methods: ["GET", "POST"],
  },
});
