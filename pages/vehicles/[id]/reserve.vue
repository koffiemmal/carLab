<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <NuxtLink to="/vehicles" class="text-primary-600 hover:text-primary-700 mb-6 inline-flex items-center font-medium">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Retour aux véhicules
      </NuxtLink>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>

      <div v-else-if="vehicle" class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="card p-8 mb-6">
            <div class="flex items-start justify-between mb-6">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">
                  {{ vehicle.brand }} {{ vehicle.model }} {{ vehicle.year }} - Auto
                </h1>
                <div class="text-3xl font-bold text-gray-900 mb-4">$80 /Jour</div>
                <div class="flex items-center space-x-6">
                  <div class="flex items-center space-x-1">
                    <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span class="font-semibold text-gray-900">4.8</span>
                  </div>
                  <div class="flex items-center space-x-1 text-gray-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span>{{ vehicle.mileage }} miles</span>
                  </div>
                  <div class="flex items-center space-x-1 text-gray-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>52 trips</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="h-96 bg-gray-100 rounded-2xl mb-6 flex items-center justify-center">
              <svg v-if="!vehicle.image" class="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <img v-else :src="vehicle.image" :alt="vehicle.brand" class="w-full h-full object-cover rounded-2xl" />
            </div>

            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-4">Caractéristiques du véhicule</h3>
              <div class="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 class="font-semibold text-gray-900 mb-3">Sécurité</h4>
                  <ul class="space-y-2 text-sm text-gray-600">
                    <li>• Caméra de recul</li>
                    <li>• Surveillance pression pneus</li>
                    <li>• Alerte angle mort</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-3">Connectivité</h4>
                  <ul class="space-y-2 text-sm text-gray-600">
                    <li>• Audio Bluetooth</li>
                    <li>• Port AUX</li>
                    <li>• Système de navigation</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-3">Confort</h4>
                  <ul class="space-y-2 text-sm text-gray-600">
                    <li>• Clé intelligente</li>
                    <li>• Vents AC arrière</li>
                    <li>• Sièges réglables</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="card p-6 sticky top-24">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Votre voyage</h2>
            <form @submit.prevent="handleReserve" class="space-y-5">
              <div class="relative">
                <label class="block text-sm font-semibold text-gray-900 mb-2">Lieu de prise en charge</label>
                <div class="relative">
                  <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <input
                    v-model="form.pickupLocation"
                    type="text"
                    class="input-field pl-10"
                    placeholder="Sélectionnez votre lieu"
                    required
                  />
                </div>
              </div>

              <div class="relative">
                <label class="block text-sm font-semibold text-gray-900 mb-2">Lieu de retour</label>
                <div class="relative">
                  <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <input
                    v-model="form.dropoffLocation"
                    type="text"
                    class="input-field pl-10"
                    placeholder="Sélectionnez votre lieu"
                    required
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="relative">
                  <label class="block text-sm font-semibold text-gray-900 mb-2">Date de début</label>
                  <div class="relative">
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <input
                      v-model="form.startDate"
                      type="date"
                      class="input-field pl-10"
                      :min="minDate"
                      required
                    />
                  </div>
                </div>
                <div class="relative">
                  <label class="block text-sm font-semibold text-gray-900 mb-2">Date de fin</label>
                  <div class="relative">
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <input
                      v-model="form.endDate"
                      type="date"
                      class="input-field pl-10"
                      :min="form.startDate || minDate"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="relative">
                  <label class="block text-sm font-semibold text-gray-900 mb-2">Heure de début</label>
                  <div class="relative">
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <input
                      v-model="form.startTime"
                      type="time"
                      class="input-field pl-10"
                      required
                    />
                  </div>
                </div>
                <div class="relative">
                  <label class="block text-sm font-semibold text-gray-900 mb-2">Heure de fin</label>
                  <div class="relative">
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <input
                      v-model="form.endTime"
                      type="time"
                      class="input-field pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-900 mb-2">Raison de la réservation</label>
                <textarea
                  v-model="form.purpose"
                  class="input-field"
                  rows="3"
                  placeholder="Décrivez la raison de votre réservation"
                ></textarea>
              </div>

              <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {{ error }}
              </div>

              <div class="pt-4 border-t border-gray-200">
                <div class="space-y-3 mb-6">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Location (4 jours)</span>
                    <span class="font-semibold text-gray-900">$344</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Réduction spéciale</span>
                    <span class="font-semibold text-green-600">-$24</span>
                  </div>
                  <div class="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                    <span class="text-gray-900">Paiement total</span>
                    <span class="text-gray-900">$320</span>
                  </div>
                </div>
                <button
                  type="submit"
                  :disabled="submitting"
                  class="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  <span v-if="submitting">Réservation en cours...</span>
                  <span v-else>Paiement total</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVehicleStore } from '~/stores/vehicles'
import { useReservationStore } from '~/stores/reservations'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const vehicleStore = useVehicleStore()
const reservationStore = useReservationStore()

const vehicle = ref(null)
const loading = ref(true)
const submitting = ref(false)
const error = ref('')

const minDate = new Date().toISOString().split('T')[0]

const form = reactive({
  pickupLocation: '',
  dropoffLocation: '',
  startDate: '',
  endDate: '',
  startTime: '08:00',
  endTime: '18:00',
  purpose: '',
  notes: ''
})

onMounted(async () => {
  try {
    vehicle.value = await vehicleStore.fetchVehicle(route.params.id)
  } catch (err) {
    error.value = err.data?.message || 'Erreur lors du chargement du véhicule'
  } finally {
    loading.value = false
  }
})

const handleReserve = async () => {
  submitting.value = true
  error.value = ''

  try {
    await reservationStore.createReservation({
      vehicle: route.params.id,
      ...form
    })
    
    router.push('/reservations')
  } catch (err) {
    error.value = err.data?.message || 'Erreur lors de la création de la réservation'
  } finally {
    submitting.value = false
  }
}
</script>
