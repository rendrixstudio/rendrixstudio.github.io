import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/",   // root domain, not a subfolder
  plugins: [react()],
});