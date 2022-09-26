import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    server: {
      host: true,
      port: Number(process.env.PORT || 8080),
    },
    preview: {
      host: true,
      port: Number(process.env.PORT || 4173),
    },
  });
};
