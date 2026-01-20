<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header toujours visible -->
    <Header />
    
    <!-- Contenu principal avec sidebar conditionnelle -->
    <div class="flex relative">
      <!-- Sidebar fixe à gauche (seulement si authentifié) -->
      <Sidebar v-if="authStore.isAuthenticated" />
      
      <!-- Contenu principal avec marge pour la sidebar -->
      <main :class="[
        'flex-1 transition-all duration-300',
        authStore.isAuthenticated ? 'ml-64' : 'ml-0'
      ]">
        <div class="min-h-[calc(100vh-4rem)]">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import Header from '~/components/Header.vue'
import Sidebar from '~/components/Sidebar.vue'

const authStore = useAuthStore()

// S'assurer que l'auth est initialisée
onMounted(() => {
  if (process.client) {
    authStore.initAuth()
  }
})
</script>
