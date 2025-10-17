import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/BABU-portfolio/', // <-- important for GitHub Pages
});
