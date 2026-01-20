<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête simplifié -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
              </svg>
              <span>Véhicules</span>
            </h1>
            <p class="text-sm text-gray-600 mt-1">
              Bonjour, {{ authStore.fullName }} — Voici votre vue d'ensemble des véhicules disponibles
            </p>
          </div>
        </div>
      </div>

      <!-- Formulaire de recherche compact -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="relative">
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Point de départ</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <input
                v-model="searchForm.pickupLocation"
                type="text"
                class="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Sélectionnez votre"
              />
            </div>
          </div>
          <div class="relative">
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Point de retour</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <input
                v-model="searchForm.dropoffLocation"
                type="text"
                class="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Sélectionnez votre"
              />
            </div>
          </div>
          <div class="relative">
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Date de début</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <input
                v-model="searchForm.startDate"
                type="date"
                class="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                :min="minDate"
              />
            </div>
          </div>
          <div class="relative">
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Date de fin</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <input
                v-model="searchForm.endDate"
                type="date"
                class="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                :min="searchForm.startDate || minDate"
              />
            </div>
          </div>
          <div class="relative">
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Heure de début</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <input
                v-model="searchForm.startTime"
                type="time"
                class="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div class="relative">
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Heure de fin</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <input
                v-model="searchForm.endTime"
                type="time"
                class="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Contenu principal avec filtres et résultats -->
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Sidebar des filtres -->
        <aside class="lg:w-72 flex-shrink-0">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-24">
            <div class="flex justify-between items-center mb-5">
              <h2 class="text-lg font-bold text-gray-900">Filtres</h2>
              <button 
                @click="resetFilters" 
                class="text-xs text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                Réinitialiser
              </button>
            </div>

            <div class="space-y-5">
              <!-- Marque -->
              <div>
                <label class="block text-sm font-semibold text-gray-900 mb-2">Marque</label>
                <div class="relative">
                  <select 
                    v-model="filters.brand" 
                    class="w-full pl-3 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none cursor-pointer bg-white"
                    @change="applyFilters"
                  >
                    <option value="">Sélectionner une marque</option>
                    <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
                  </select>
                  <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>

              <!-- Modèle -->
              <div>
                <label class="block text-sm font-semibold text-gray-900 mb-2">Modèle</label>
                <div class="relative">
                  <select class="w-full pl-3 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none cursor-pointer bg-white">
                    <option value="">Choisir un modèle</option>
                  </select>
                  <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>

              <!-- Budget -->
              <div>
                <label class="block text-sm font-semibold text-gray-900 mb-2">Budget</label>
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-xs text-gray-600">
                    <span>$30.00</span>
                    <span>$90.00</span>
                  </div>
                  <input 
                    type="range" 
                    min="30" 
                    max="90" 
                    class="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                </div>
              </div>

              <!-- Type -->
              <div>
                <label class="block text-sm font-semibold text-gray-900 mb-2">Type</label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="type in vehicleTypes"
                    :key="type"
                    @click="toggleType(type)"
                    :class="[
                      'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                      filters.type === type
                        ? 'bg-primary-500 text-white shadow-sm hover:bg-primary-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    ]"
                  >
                    {{ type }}
                  </button>
                </div>
              </div>

              <!-- Couleur -->
              <div>
                <label class="block text-sm font-semibold text-gray-900 mb-2">Couleur</label>
                <div class="flex flex-wrap gap-2.5">
                  <button
                    v-for="color in colors"
                    :key="color"
                    :class="[
                      'w-10 h-10 rounded-full border-2 transition-all hover:scale-110',
                      color === 'All Colors' 
                        ? 'bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center text-xs font-semibold text-gray-700 border-gray-300' 
                        : 'border-gray-300 hover:border-primary-500',
                      color === 'Black' ? 'bg-gray-900' : '',
                      color === 'Blue' ? 'bg-blue-600' : '',
                      color === 'Brown' ? 'bg-amber-800' : '',
                      color === 'Red' ? 'bg-red-600' : '',
                      color === 'Silver' ? 'bg-gray-400' : ''
                    ]"
                  >
                    <span v-if="color === 'All Colors'" class="text-xs font-bold">All</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Zone de résultats -->
        <main class="flex-1">
          <!-- État de chargement -->
          <div v-if="vehicleStore.loading" class="text-center py-20">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            <p class="mt-4 text-gray-600 font-medium text-sm">Chargement des véhicules...</p>
          </div>

          <!-- État vide -->
          <div v-else-if="vehicleStore.vehicles.length === 0" class="text-center py-20 bg-white rounded-xl border border-gray-200">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <p class="text-gray-600 text-base font-medium mb-1">Aucun véhicule trouvé</p>
            <p class="text-gray-500 text-sm">Essayez de modifier vos critères de recherche</p>
          </div>

          <!-- Grille de véhicules -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <VehicleCard
              v-for="vehicle in vehicleStore.vehicles"
              :key="vehicle._id"
              :vehicle="vehicle"
              :search-form="searchForm"
              @view-details="openVehicleModal"
            />
          </div>
        </main>
      </div>
    </div>

    <!-- Modal de détails du véhicule -->
    <VehicleDetailsModal
      :is-open="isModalOpen"
      :vehicle-id="selectedVehicleId"
      @close="closeVehicleModal"
      @reserved="handleReservationSuccess"
    />
  </div>
</template>

<script setup>
import { useVehicleStore } from '~/stores/vehicles'
import { useAuthStore } from '~/stores/auth'
import { useReservationStore } from '~/stores/reservations'
import VehicleDetailsModal from '~/components/VehicleDetailsModal.vue'

definePageMeta({
  middleware: 'auth'
})

const vehicleStore = useVehicleStore()
const authStore = useAuthStore()

const minDate = new Date().toISOString().split('T')[0]
const isModalOpen = ref(false)
const selectedVehicleId = ref(null)

const openVehicleModal = (vehicleId) => {
  console.log('🔍 [Vehicles Page] openVehicleModal appelé avec ID:', vehicleId)
  selectedVehicleId.value = vehicleId
  isModalOpen.value = true
  console.log('🔍 [Vehicles Page] isModalOpen:', isModalOpen.value)
  console.log('🔍 [Vehicles Page] selectedVehicleId:', selectedVehicleId.value)
}

const closeVehicleModal = () => {
  isModalOpen.value = false
  selectedVehicleId.value = null
}

const handleReservationSuccess = () => {
  closeVehicleModal()
}

const searchForm = reactive({
  pickupLocation: '',
  dropoffLocation: '',
  startDate: '',
  endDate: '',
  startTime: '08:00',
  endTime: '18:00'
})

const filters = reactive({
  type: '',
  brand: '',
  search: ''
})

const vehicleTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Pickup', 'Van']
const colors = ['All Colors', 'Black', 'Blue', 'Brown', 'Red', 'Silver']

const brands = ref([])

onMounted(async () => {
  await vehicleStore.fetchVehicles()
  extractBrands()
})

const extractBrands = () => {
  const uniqueBrands = [...new Set(vehicleStore.vehicles.map(v => v.brand))]
  brands.value = uniqueBrands.sort()
}

const searchAvailable = async () => {
  if (!searchForm.startDate || !searchForm.endDate) {
    alert('Veuillez sélectionner les dates de début et de fin')
    return
  }

  try {
    const vehicles = await vehicleStore.fetchAvailableVehicles(
      searchForm.startDate,
      searchForm.endDate
    )
    vehicleStore.vehicles = vehicles
  } catch (error) {
    alert(error.data?.message || 'Erreur lors de la recherche')
  }
}

const toggleType = (type) => {
  filters.type = filters.type === type ? '' : type
  applyFilters()
}

const applyFilters = async () => {
  vehicleStore.setFilters(filters)
  await vehicleStore.fetchVehicles(filters)
}

const resetFilters = async () => {
  filters.type = ''
  filters.brand = ''
  filters.search = ''
  vehicleStore.resetFilters()
  await vehicleStore.fetchVehicles()
}
</script>
