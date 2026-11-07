import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,json}'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
      },
      manifest: {
        name: 'LKHODRA · الخضرة والغلة المغربية — Atlas Botanique & Saisons du Terroir',
        short_name: 'LKHODRA · الخضرة',
        description:
          'Moroccan Fruits & Vegetables Encyclopedia in Darija, 12-month harvest calendar, clinical nutritional benefits, terroir map, and Souk prices.',
        lang: 'ar',
        theme_color: '#0a0d09',
        background_color: '#0a0d09',
        display: 'standalone',
        orientation: 'any',
        start_url: './',
        scope: './',
        categories: ['food', 'health', 'education'],
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    css: false,
  },
})
