// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    mongoUri: process.env.MONGO_URI || 'mongodb+srv://test1:AZemmanuel20@cluster0.e97aj.mongodb.net/carLab?retryWrites=true&w=majority',
    public: {
      apiBase: '/api'
    }
  },
  nitro: {
    preset: process.env.NITRO_PRESET || 'vercel'
  },
  app: {
    head: {
      title: 'CarLab - Gestion de Réservations',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Application de gestion de réservations de véhicules' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
