// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'], // Deixamos apenas o favicon aqui para evitar erros
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'TRIPWAY',
        short_name: 'TRIPWAY',
        description: 'Planeje sua viagem com facilidade.',
        theme_color: '#007bff', // Cor da barra de navegação no celular (Azul do TripWay)
        background_color: '#f8f9fa', // Cor da tela de carregamento (Cinza claro do fundo)
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'logo192.png', // Nome mais limpo (Salve na pasta public com esse nome!)
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable' // Isso ajuda o ícone a não ficar cortado no Android
          },
          {
            src: 'logo512.png', // Nome mais limpo (Salve na pasta public com esse nome!)
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    host: '127.0.0.1', // Força o servidor a rodar neste IP
    port: 5173,
  },
  base: "/",
})