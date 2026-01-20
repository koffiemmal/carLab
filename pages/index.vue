<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span>Dashboard</span>
            </h1>
            <p class="text-sm text-gray-600 mt-1">
              Bonjour, {{ authStore.fullName }} — Voici votre vue d'ensemble
            </p>
          </div>
          <NuxtLink
            v-if="authStore.isAuthenticated"
            to="/vehicles"
            class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center space-x-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </svg>
            <span>Voir les véhicules</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Cards de statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Véhicules</h3>
            <div class="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
              </svg>
            </div>
          </div>
          <div class="flex items-baseline space-x-2">
            <span class="text-2xl font-bold text-gray-900">{{ totalVehicles }}</span>
            <span class="text-sm text-gray-500">disponibles</span>
          </div>
          <p class="text-xs text-gray-500 mt-2">{{ availableVehicles }} libres maintenant</p>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Réservations</h3>
            <div class="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
          <div class="flex items-baseline space-x-2">
            <span class="text-2xl font-bold text-gray-900">{{ reservationsCount }}</span>
            <span class="text-sm text-gray-500">actives</span>
          </div>
          <p class="text-xs text-gray-500 mt-2">Mes réservations</p>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Disponibles</h3>
            <div class="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div class="flex items-baseline space-x-2">
            <span class="text-2xl font-bold text-gray-900">{{ availableVehicles }}</span>
            <span class="text-sm text-gray-500">maintenant</span>
          </div>
          <p class="text-xs text-gray-500 mt-2">Véhicules libres</p>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Types</h3>
            <div class="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
            </div>
          </div>
          <div class="flex items-baseline space-x-2">
            <span class="text-2xl font-bold text-gray-900">{{ uniqueTypes }}</span>
            <span class="text-sm text-gray-500">différents</span>
          </div>
          <p class="text-xs text-gray-500 mt-2">Catégories disponibles</p>
        </div>
      </div>

      <!-- Actions rapides -->
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <!-- Dernières réservations -->
        <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-gray-900">Dernières réservations</h2>
            <NuxtLink to="/reservations" class="text-sm text-primary-600 hover:text-primary-700 font-semibold">
              Voir tout
            </NuxtLink>
          </div>
          <div v-if="recentReservations.length === 0" class="text-center py-8">
            <p class="text-gray-500 text-sm">Aucune réservation récente</p>
            <NuxtLink to="/vehicles" class="text-primary-600 hover:text-primary-700 text-sm font-semibold mt-2 inline-block">
              Réserver un véhicule
            </NuxtLink>
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="reservation in recentReservations.slice(0, 3)"
              :key="reservation._id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-900">{{ reservation.vehicle?.brand }} {{ reservation.vehicle?.model }}</p>
                  <p class="text-xs text-gray-500">{{ formatDate(reservation.startDate) }}</p>
                </div>
              </div>
              <span :class="[
                'px-2 py-1 rounded text-xs font-semibold',
                getStatusClass(reservation.status)
              ]">
                {{ getStatusLabel(reservation.status) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Actions rapides -->
        <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Actions rapides</h2>
          <div class="space-y-3">
            <NuxtLink
              to="/vehicles"
              class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div class="w-10 h-10 rounded-lg bg-primary-100 group-hover:bg-primary-200 flex items-center justify-center transition-colors">
                <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-900">Réserver un véhicule</p>
                <p class="text-xs text-gray-500">Parcourez notre catalogue</p>
              </div>
            </NuxtLink>
            <NuxtLink
              to="/reservations"
              class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div class="w-10 h-10 rounded-lg bg-secondary-100 group-hover:bg-secondary-200 flex items-center justify-center transition-colors">
                <svg class="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-900">Mes réservations</p>
                <p class="text-xs text-gray-500">Gérez vos réservations</p>
              </div>
            </NuxtLink>
            <NuxtLink
              to="/notifications"
              class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div class="w-10 h-10 rounded-lg bg-accent-100 group-hover:bg-accent-200 flex items-center justify-center transition-colors">
                <svg class="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-900">Notifications</p>
                <p class="text-xs text-gray-500">Voir vos notifications</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Section pour utilisateurs non authentifiés -->
      <div v-if="!authStore.isAuthenticated" class="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Commencez votre voyage</h2>
        <p class="text-gray-600 mb-6">Rejoignez CarLab et réservez votre véhicule en quelques clics</p>
        <div class="flex items-center justify-center space-x-4">
          <NuxtLink
            to="/login"
            class="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm"
          >
            Se connecter
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-lg border border-gray-300 transition-colors"
          >
            S'inscrire
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { useVehicleStore } from '~/stores/vehicles'
import { useReservationStore } from '~/stores/reservations'

const authStore = useAuthStore()
const vehicleStore = useVehicleStore()
const reservationStore = useReservationStore()

const totalVehicles = ref(0)
const availableVehicles = ref(0)
const reservationsCount = ref(0)
const uniqueTypes = ref(0)
const recentReservations = ref([])

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

const getStatusLabel = (status) => {
  const labels = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    active: 'Active',
    completed: 'Terminée',
    cancelled: 'Annulée'
  }
  return labels[status] || status
}

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    active: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

onMounted(async () => {
  if (authStore.isAuthenticated) {
    try {
      await vehicleStore.fetchVehicles()
      totalVehicles.value = vehicleStore.vehicles.length
      availableVehicles.value = vehicleStore.vehicles.filter(v => v.status === 'available').length
      
      const types = new Set(vehicleStore.vehicles.map(v => v.type))
      uniqueTypes.value = types.size

      await reservationStore.fetchReservations()
      reservationsCount.value = reservationStore.reservations.filter(r => r.status !== 'cancelled').length
      recentReservations.value = reservationStore.reservations
        .filter(r => r.status !== 'cancelled')
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        .slice(0, 5)
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
    }
  }
})
</script>
