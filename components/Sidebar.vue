<template>
  <aside class="w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-16 bottom-0 z-30 overflow-y-auto shadow-sm">
    <!-- Logo et branding -->
    <div class="p-6 border-b border-gray-200">
      <NuxtLink to="/" class="flex items-center space-x-3 mb-4">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
          <span class="text-white font-bold text-lg">CL</span>
        </div>
        <span class="text-xl font-bold text-gray-900">CarLab</span>
      </NuxtLink>
      <div class="flex items-center space-x-2 text-sm text-gray-600">
        <span class="font-semibold text-primary-600">Free</span>
        <span class="text-gray-400">(0/10)</span>
        <svg class="w-4 h-4 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
    </div>

    <!-- Navigation principale -->
    <nav class="flex-1 p-4">
      <div v-if="!authStore.isAdmin" class="mb-6">
        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">Réservations</h3>
        <div class="space-y-1">
          <NuxtLink
            to="/"
            :class="[
              'flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all',
              isActive('/') ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span>Dashboard</span>
          </NuxtLink>

          <NuxtLink
            to="/vehicles"
            :class="[
              'flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all',
              isActive('/vehicles') ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </svg>
            <span>Véhicules</span>
          </NuxtLink>

               <NuxtLink
                 to="/reservations"
                 :class="[
                   'flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all',
                   isActive('/reservations') ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                 ]"
               >
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                 </svg>
                 <span>Mes réservations</span>
               </NuxtLink>

               <NuxtLink
                 to="/ai-recommend"
                 :class="[
                   'flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all',
                   isActive('/ai-recommend') ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                 ]"
               >
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                 </svg>
                 <span>Recommandation IA</span>
               </NuxtLink>
        </div>
      </div>

      <div v-if="authStore.isAdmin" class="mb-6">
        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">Administration</h3>
        <div class="space-y-1">
          <NuxtLink
            to="/admin"
            :class="[
              'flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all',
              isActive('/admin') && !isActive('/admin/vehicles') && !isActive('/admin/reservations') ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span>Dashboard</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/vehicles"
            :class="[
              'flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all',
              isActive('/admin/vehicles') ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </svg>
            <span>Véhicules</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/reservations"
            :class="[
              'flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all',
              isActive('/admin/reservations') ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>Réservations</span>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Section Upgrade -->
    <div class="p-4 border-t border-gray-200">
      <div class="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-xl p-4 mb-4">
        <h4 class="font-bold text-gray-900 mb-2">Upgrade to Pro</h4>
        <ul class="space-y-2 text-sm text-gray-700 mb-3">
          <li class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span>Plus de véhicules</span>
          </li>
          <li class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span>Réservations illimitées</span>
          </li>
          <li class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span>Support prioritaire</span>
          </li>
        </ul>
        <button class="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          <span>Upgrade</span>
        </button>
      </div>

      <!-- User info -->
      <button
        @click="toggleUserMenu"
        class="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0">
          <span class="text-white font-semibold text-sm">
            {{ authStore.user?.firstName?.charAt(0) }}{{ authStore.user?.lastName?.charAt(0) }}
          </span>
        </div>
        <div class="flex-1 min-w-0 text-left">
          <p class="text-sm font-semibold text-gray-900 truncate">{{ authStore.fullName }}</p>
          <p class="text-xs text-gray-500 truncate">{{ authStore.user?.email }}</p>
        </div>
      </button>
    </div>

    <!-- User Menu Bottom Sheet -->
    <UserMenu :is-open="isUserMenuOpen" @close="closeUserMenu" />
  </aside>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()

const isUserMenuOpen = ref(false)

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const closeUserMenu = () => {
  isUserMenuOpen.value = false
}

const toggleSidebar = () => {
  // Fonctionnalité de collapse/expand à implémenter si nécessaire
}
</script>
