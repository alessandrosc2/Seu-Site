import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // Permite servir o `vite dev` atrás de um host de preview/túnel.
      // Só afeta o servidor de desenvolvimento (não o build, nem a Vercel),
      // e só é ativado quando a variável ALLOW_PREVIEW_HOST=true existe.
      ...(process.env.ALLOW_PREVIEW_HOST === 'true' ? { allowedHosts: true as const } : {}),
    },
  };
});
