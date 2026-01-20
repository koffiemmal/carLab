<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>Mes Réservations</span>
            </h1>
            <p class="text-sm text-gray-600 mt-1">Gérez toutes vos réservations de véhicules</p>
          </div>
          <NuxtLink
            to="/vehicles"
            class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center space-x-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Nouvelle réservation</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Filtres -->
      <div class="mb-6">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="status in statusFilters"
            :key="status.value"
            @click="filterByStatus(status.value)"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-semibold transition-all',
              currentFilter === status.value
                ? 'bg-primary-500 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            ]"
          >
            {{ status.label }}
          </button>
        </div>
      </div>

      <!-- État de chargement -->
      <div v-if="reservationStore.loading" class="text-center py-20 bg-white rounded-xl border border-gray-200">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        <p class="mt-4 text-gray-600 font-medium text-sm">Chargement des réservations...</p>
      </div>

      <!-- État vide -->
      <div v-else-if="reservationStore.reservations.length === 0" class="text-center py-20 bg-white rounded-xl border border-gray-200">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <p class="text-gray-600 text-base font-medium mb-1">Aucune réservation trouvée</p>
        <p class="text-gray-500 text-sm mb-4">Vous n'avez pas encore de réservations</p>
        <NuxtLink
          to="/vehicles"
          class="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg inline-block transition-colors shadow-sm"
        >
          Réserver un véhicule
        </NuxtLink>
      </div>

      <!-- Liste des réservations -->
      <div v-else class="space-y-4">
        <ReservationCard
          v-for="reservation in reservationStore.reservations"
          :key="reservation._id"
          :reservation="reservation"
          @refresh="loadReservations"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useReservationStore } from '~/stores/reservations'

definePageMeta({
  middleware: 'auth'
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

onMounted(() => {
  loadReservations()
})

const loadReservations = async () => {
  try {
    await reservationStore.fetchReservations(
      currentFilter.value ? { status: currentFilter.value } : {}
    )
  } catch (error) {
    console.error('Erreur lors du chargement des réservations:', error)
  }
}

const filterByStatus = (status) => {
  currentFilter.value = status
  loadReservations()
}
</script>
