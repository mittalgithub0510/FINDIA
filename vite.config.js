import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { getLiveCrowdData } from './src/server/liveCrowdService.js';

function liveCrowdPlugin() {
  return {
    name: 'live-crowd-api',
    configureServer(server) {
      server.middlewares.use('/api/live-crowd', async (req, res) => {
        try {
          const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
          const placeName = url.searchParams.get('placeName') || url.searchParams.get('place') || '';
          const city = url.searchParams.get('city') || 'delhi';

          const data = await getLiveCrowdData(placeName, city);

          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.statusCode = 200;
          res.end(JSON.stringify(data));
        } catch (error) {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error.message }));
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/live-crowd', async (req, res) => {
        try {
          const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
          const placeName = url.searchParams.get('placeName') || url.searchParams.get('place') || '';
          const city = url.searchParams.get('city') || 'delhi';

          const data = await getLiveCrowdData(placeName, city);

          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.statusCode = 200;
          res.end(JSON.stringify(data));
        } catch (error) {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error.message }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    liveCrowdPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/icon-192x192.png', 'icons/icon-512x512.png'],
      manifest: {
        name: 'FINDIA',
        short_name: 'FINDIA',
        description: 'Multi-city India urban telemetry and heritage navigation PWA',
        theme_color: '#12100E',
        background_color: '#12100E',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // TODO: Add offline caching strategies here in a future step
      }
    })
  ]
});
