<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Bouton retour -->
      <NuxtLink
        to="/vehicles"
        class="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6 font-semibold text-sm transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        <span>Retour aux véhicules</span>
      </NuxtLink>

      <!-- Debug info -->
      <div class="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-xs">
        <p class="font-bold mb-2">🔍 Debug Info:</p>
        <p>Loading: <span class="font-mono">{{ loading }}</span></p>
        <p>Error: <span class="font-mono">{{ error || 'Aucune erreur' }}</span></p>
        <p>Vehicle: <span class="font-mono">{{ vehicle ? 'Existe (' + (vehicle.brand || 'N/A') + ')' : 'Null' }}</span></p>
        <p>Route path: <span class="font-mono">{{ route.path || 'N/A' }}</span></p>
        <p>Route params: <span class="font-mono">{{ JSON.stringify(route.params || {}) }}</span></p>
        <p>Vehicle ID: <span class="font-mono">{{ route.params?.id || 'N/A' }}</span></p>
      </div>

      <!-- État de chargement -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        <p class="mt-4 text-gray-600 font-medium text-sm">Chargement des détails...</p>
      </div>

      <!-- État erreur -->
      <div v-else-if="error" class="text-center py-20 bg-white rounded-xl border border-gray-200">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <p class="text-gray-600 text-base font-medium mb-1">{{ error }}</p>
        <NuxtLink
          to="/vehicles"
          class="text-primary-600 hover:text-primary-700 text-sm font-semibold mt-2 inline-block"
        >
          Retour aux véhicules
        </NuxtLink>
      </div>

      <!-- Détails du véhicule -->
      <div v-else-if="vehicle" class="grid lg:grid-cols-3 gap-6">
        <!-- Colonne principale -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Image principale -->
          <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div class="relative h-96 bg-gray-100 rounded-xl overflow-hidden mb-4">
              <img
                v-if="vehicle.image"
                :src="vehicle.image"
                :alt="`${vehicle.brand} ${vehicle.model}`"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <svg class="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
              </div>
              <div class="absolute top-4 right-4 flex space-x-2">
                <button class="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-all shadow-md">
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
                <button class="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-all shadow-md">
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.885 12.938 9 12.482 9 12c0-.482-.115-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Informations principales -->
          <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div class="flex items-start justify-between mb-6">
              <div class="flex-1">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">
                  {{ vehicle.brand }} {{ vehicle.model }} {{ vehicle.year }}
                </h1>
                <div class="flex items-center space-x-4 mb-4">
                  <div class="flex items-center space-x-1">
                    <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span class="font-semibold text-gray-900">4.8</span>
                    <span class="text-sm text-gray-500">(24 avis)</span>
                  </div>
                  <div class="flex items-center space-x-1 text-gray-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    <span>{{ vehicle.mileage }} km</span>
                  </div>
                  <div class="flex items-center space-x-1 text-gray-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>52 voyages</span>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-3xl font-bold text-gray-900">$80</div>
                <div class="text-sm text-gray-500">par jour</div>
              </div>
            </div>

            <!-- Description -->
            <div v-if="vehicle.description" class="mb-6">
              <h2 class="text-lg font-bold text-gray-900 mb-3">Description</h2>
              <p class="text-gray-600 leading-relaxed">{{ vehicle.description }}</p>
            </div>

            <!-- Caractéristiques -->
            <div>
              <h2 class="text-lg font-bold text-gray-900 mb-4">Caractéristiques</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div class="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Type</p>
                    <p class="text-sm font-semibold text-gray-900">{{ vehicle.type }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div class="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Places</p>
                    <p class="text-sm font-semibold text-gray-900">{{ vehicle.seats }} personnes</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div class="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Couleur</p>
                    <p class="text-sm font-semibold text-gray-900">{{ vehicle.color || 'Non spécifié' }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div class="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Plaque</p>
                    <p class="text-sm font-semibold text-gray-900">{{ vehicle.licensePlate }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div class="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Année</p>
                    <p class="text-sm font-semibold text-gray-900">{{ vehicle.year }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div class="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Statut</p>
                    <p class="text-sm font-semibold" :class="getStatusClass(vehicle.status)">
                      {{ getStatusLabel(vehicle.status) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar de réservation -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">
            <div class="mb-6">
              <div class="text-3xl font-bold text-gray-900 mb-1">$80</div>
              <div class="text-sm text-gray-500">par jour</div>
            </div>

            <div class="space-y-4 mb-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Date de début</label>
                <input
                  v-model="reservationForm.startDate"
                  type="date"
                  :min="minDate"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Date de fin</label>
                <input
                  v-model="reservationForm.endDate"
                  type="date"
                  :min="reservationForm.startDate || minDate"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Heure de début</label>
                <input
                  v-model="reservationForm.startTime"
                  type="time"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Heure de fin</label>
                <input
                  v-model="reservationForm.endTime"
                  type="time"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
              {{ error }}
            </div>

            <NuxtLink
              :to="`/vehicles/${vehicle._id}/reserve`"
              class="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm flex items-center justify-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>Réserver maintenant</span>
            </NuxtLink>

            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="space-y-3 text-sm">
                <div class="flex items-center space-x-2 text-gray-600">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Annulation gratuite</span>
                </div>
                <div class="flex items-center space-x-2 text-gray-600">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Assurance incluse</span>
                </div>
                <div class="flex items-center space-x-2 text-gray-600">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Support 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVehicleStore } from '~/stores/vehicles'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const vehicleStore = useVehicleStore()

const vehicle = ref(null)
const loading = ref(true)
const error = ref('')

console.log('🔍 [Vehicle Details Page] Script setup exécuté')
console.log('🔍 [Vehicle Details Page] Route actuelle:', route.path)
console.log('🔍 [Vehicle Details Page] Route params:', route.params)

const minDate = new Date().toISOString().split('T')[0]

const reservationForm = reactive({
  startDate: '',
  endDate: '',
  startTime: '08:00',
  endTime: '18:00'
})

const getStatusLabel = (status) => {
  const labels = {
    available: 'Disponible',
    unavailable: 'Indisponible',
    maintenance: 'En maintenance',
    reserved: 'Réservé'
  }
  return labels[status] || status
}

const getStatusClass = (status) => {
  const classes = {
    available: 'text-green-600',
    unavailable: 'text-red-600',
    maintenance: 'text-yellow-600',
    reserved: 'text-blue-600'
  }
  return classes[status] || 'text-gray-600'
}

onMounted(async () => {
  console.log('🔍 [Vehicle Details] Page montée')
  console.log('🔍 [Vehicle Details] Route:', route.path)
  console.log('🔍 [Vehicle Details] Route params:', route.params)
  
  try {
    const vehicleId = route.params.id
    console.log('🔍 [Vehicle Details] ID du véhicule:', vehicleId)
    
    if (!vehicleId) {
      console.error('❌ [Vehicle Details] Aucun ID de véhicule trouvé dans les paramètres')
      error.value = 'ID de véhicule manquant'
      loading.value = false
      return
    }
    
    console.log('🔍 [Vehicle Details] Appel de fetchVehicle avec ID:', vehicleId)
    vehicle.value = await vehicleStore.fetchVehicle(vehicleId)
    console.log('✅ [Vehicle Details] Véhicule récupéré:', vehicle.value)
  } catch (err) {
    console.error('❌ [Vehicle Details] Erreur lors du chargement:', err)
    console.error('❌ [Vehicle Details] Détails de l\'erreur:', {
      message: err.message,
      data: err.data,
      statusCode: err.statusCode
    })
    error.value = err.data?.message || err.message || 'Véhicule non trouvé'
  } finally {
    loading.value = false
    console.log('🔍 [Vehicle Details] Chargement terminé, loading:', loading.value)
  }
})
</script>
