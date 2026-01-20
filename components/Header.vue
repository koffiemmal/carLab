<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div class="flex items-center justify-between px-6 h-16">
      <!-- Logo - toujours visible -->
      <NuxtLink to="/" class="flex items-center space-x-3">
        <img :src="logoImage" alt="CarLab" class="h-10 w-auto" />
        <span class="text-2xl font-bold text-gray-900">CarLab</span>
      </NuxtLink>

      <!-- Barre de recherche centrale (seulement si authentifié) -->
      <div v-if="authStore.isAuthenticated" class="flex-1 max-w-2xl mx-8">
        <div class="relative">
          <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            @keyup.enter="handleSearch"
            placeholder="Rechercher un véhicule..."
            class="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            <kbd class="px-2 py-1 text-xs font-semibold text-gray-500 bg-white border border-gray-200 rounded">⌘</kbd>
            <kbd class="px-2 py-1 text-xs font-semibold text-gray-500 bg-white border border-gray-200 rounded">K</kbd>
          </div>
        </div>
      </div>

      <!-- Actions à droite -->
      <div class="flex items-center space-x-2">
        <button v-if="authStore.isAuthenticated" class="p-2 hover:bg-gray-100 rounded-lg transition-colors relative group">
          <svg class="w-5 h-5 text-gray-600 group-hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
        </button>
        <button v-if="authStore.isAuthenticated" class="p-2 hover:bg-gray-100 rounded-lg transition-colors relative group">
          <svg class="w-5 h-5 text-gray-600 group-hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
        </button>
        <NuxtLink
          v-if="authStore.isAuthenticated"
          to="/notifications"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors relative group"
        >
          <svg class="w-5 h-5 text-gray-600 group-hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
          <span class="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
        </NuxtLink>
        
        <!-- Profil utilisateur -->
        <div v-if="authStore.isAuthenticated" class="flex items-center space-x-3 ml-2 pl-3 border-l border-gray-200">
          <div class="flex flex-col items-end">
            <span class="text-sm font-semibold text-gray-900">{{ authStore.fullName }}</span>
            <span class="text-xs text-gray-500">{{ authStore.user?.email }}</span>
          </div>
          <button
            @click="toggleUserMenu"
            class="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center cursor-pointer hover:ring-2 ring-primary-200 transition-all"
          >
            <span class="text-white font-semibold text-sm">
              {{ authStore.user?.firstName?.charAt(0) }}{{ authStore.user?.lastName?.charAt(0) }}
            </span>
          </button>
        </div>
        <div v-else class="flex items-center space-x-2 ml-2">
          <NuxtLink to="/login" class="text-sm text-gray-700 hover:text-primary-600 font-medium transition-colors">
            Connexion
          </NuxtLink>
          <NuxtLink to="/register" class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
            Inscription
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- User Menu Bottom Sheet -->
    <UserMenu :is-open="isUserMenuOpen" @close="closeUserMenu" />
  </header>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import logoImage from '~/assets/logo/car_lab_logo.png'

const authStore = useAuthStore()
const router = useRouter()

const searchQuery = ref('')
const isUserMenuOpen = ref(false)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } })
  }
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const closeUserMenu = () => {
  isUserMenuOpen.value = false
}
</script>
