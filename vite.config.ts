import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Define environment variables to ensure they're available
  define: {
    // Ensure environment variables are properly stringified
    __FIREBASE_API_KEY__: JSON.stringify(process.env.VITE_FIREBASE_API_KEY),
    __FIREBASE_AUTH_DOMAIN__: JSON.stringify(process.env.VITE_FIREBASE_AUTH_DOMAIN),
    __FIREBASE_PROJECT_ID__: JSON.stringify(process.env.VITE_FIREBASE_PROJECT_ID),
    __FIREBASE_STORAGE_BUCKET__: JSON.stringify(process.env.VITE_FIREBASE_STORAGE_BUCKET),
    __FIREBASE_MESSAGING_SENDER_ID__: JSON.stringify(process.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
    __FIREBASE_APP_ID__: JSON.stringify(process.env.VITE_FIREBASE_APP_ID),
  },
}));
