<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center space-x-3 mb-2">
              <NuxtLink
                to="/admin"
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </NuxtLink>
              <h1 class="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>Gestion des réservations</span>
              </h1>
            </div>
            <p class="text-sm text-gray-600">Voir et gérer toutes les réservations</p>
          </div>
        </div>
      </div>

      <!-- Filtres -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="status in statusFilters"
            :key="status.value"
            @click="filterByStatus(status.value)"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-semibold transition-all',
              currentFilter === status.value
                ? 'bg-primary-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ status.label }}
          </button>
        </div>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Total</h3>
            <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
          <span class="text-2xl font-bold text-gray-900">{{ reservationStore.reservations.length }}</span>
        </div>
        <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">En attente</h3>
            <div class="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <span class="text-2xl font-bold text-gray-900">{{ pendingCount }}</span>
        </div>
        <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Actives</h3>
            <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <span class="text-2xl font-bold text-gray-900">{{ activeCount }}</span>
        </div>
        <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Annulées</h3>
            <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          </div>
          <span class="text-2xl font-bold text-gray-900">{{ cancelledCount }}</span>
        </div>
      </div>

      <!-- Liste des réservations -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-gray-900">Toutes les réservations</h2>
          <span class="text-sm text-gray-500">{{ filteredReservations.length }} réservations</span>
        </div>
        <div v-if="reservationStore.loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          <p class="mt-4 text-gray-600 text-sm">Chargement...</p>
        </div>
        <div v-else-if="filteredReservations.length === 0" class="text-center py-12">
          <p class="text-gray-600 text-sm">Aucune réservation trouvée</p>
        </div>
        <div v-else class="space-y-3">
          <ReservationCard
            v-for="reservation in filteredReservations"
            :key="reservation._id"
            :reservation="reservation"
            @refresh="loadReservations"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useReservationStore } from '~/stores/reservations'

definePageMeta({
  middleware: 'admin'
})

const reservationStore = useReservationStore()

const currentFilter = ref('')

const statusFilters = [
  { label: 'Toutes', value: '' },
  { label: 'En attente', value: 'pending' },
  { label: 'Confirmées', value: 'confirmed' },
  { label: 'Actives', value: 'active' },
  { label: 'Terminées', value: 'completed' },
  { label: 'Annulées', value: 'cancelled' }
]

const filteredReservations = computed(() => {
  if (!currentFilter.value) {
    return reservationStore.reservations
  }
  return reservationStore.reservations.filter(r => r.status === currentFilter.value)
})

const pendingCount = computed(() => {
  return reservationStore.reservations.filter(r => r.status === 'pending').length
})

const activeCount = computed(() => {
  return reservationStore.reservations.filter(r => r.status === 'active' || r.status === 'confirmed').length
})

const cancelledCount = computed(() => {
  return reservationStore.reservations.filter(r => r.status === 'cancelled').length
})

onMounted(() => {
  loadReservations()
})

const loadReservations = async () => {
  try {
    await reservationStore.fetchReservations()
  } catch (error) {
    console.error('Erreur lors du chargement des réservations:', error)
  }
}

const filterByStatus = (status) => {
  currentFilter.value = status
}
</script>
