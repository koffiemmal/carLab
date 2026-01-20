<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <span>Recherche</span>
        </h1>
        <p class="text-sm text-gray-600 mt-1">Résultats pour "{{ searchQuery }}"</p>
      </div>

      <!-- Barre de recherche -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
        <div class="relative">
          <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            @input="performSearch"
            class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Rechercher un véhicule, une marque, un modèle..."
          />
        </div>
      </div>

      <!-- Résultats -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        <p class="mt-4 text-gray-600 font-medium text-sm">Recherche en cours...</p>
      </div>

      <div v-else-if="searchResults.length === 0 && searchQuery" class="text-center py-20 bg-white rounded-xl border border-gray-200">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <p class="text-gray-600 text-base font-medium mb-1">Aucun résultat trouvé</p>
        <p class="text-gray-500 text-sm">Essayez avec d'autres mots-clés</p>
      </div>

      <div v-else-if="!searchQuery" class="text-center py-20 bg-white rounded-xl border border-gray-200">
        <p class="text-gray-600 text-base font-medium mb-1">Commencez votre recherche</p>
        <p class="text-gray-500 text-sm">Tapez un mot-clé dans la barre de recherche ci-dessus</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <VehicleCard
          v-for="vehicle in searchResults"
          :key="vehicle._id"
          :vehicle="vehicle"
          :search-form="{}"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVehicleStore } from '~/stores/vehicles'
import { useRoute } from 'vue-router'

definePageMeta({
  middleware: 'auth'
})

const vehicleStore = useVehicleStore()
const route = useRoute()

const searchQuery = ref(route.query.q || '')
const searchResults = ref([])
const loading = ref(false)

const performSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }

  loading.value = true
  try {
    await vehicleStore.fetchVehicles({ search: searchQuery.value })
    searchResults.value = vehicleStore.vehicles.filter(vehicle => {
      const query = searchQuery.value.toLowerCase()
      return (
        vehicle.brand?.toLowerCase().includes(query) ||
        vehicle.model?.toLowerCase().includes(query) ||
        vehicle.type?.toLowerCase().includes(query) ||
        vehicle.color?.toLowerCase().includes(query)
      )
    })
  } catch (error) {
    console.error('Erreur lors de la recherche:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (searchQuery.value) {
    performSearch()
  }
})
</script>
