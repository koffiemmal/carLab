<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" @click.self="closeModal">
      <Transition name="slide-up">
        <div v-if="isOpen" class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
          <!-- Header -->
          <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">Réserver ce véhicule</h2>
              <p v-if="vehicle" class="text-sm text-gray-600 mt-1">
                {{ vehicle.brand }} {{ vehicle.model }} {{ vehicle.year }}
              </p>
            </div>
            <button
              @click="closeModal"
              class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div v-if="loading" class="p-12 text-center">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            <p class="mt-4 text-gray-600 font-medium">Chargement...</p>
          </div>

          <div v-else-if="error" class="p-12 text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <p class="text-gray-600 text-base font-medium mb-4">{{ error }}</p>
            <button
              @click="closeModal"
              class="text-primary-600 hover:text-primary-700 text-sm font-semibold"
            >
              Fermer
            </button>
          </div>

          <div v-else-if="vehicle" class="p-6">
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Calendrier -->
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-4">Disponibilités</h3>
                
                <!-- Navigation du mois -->
                <div class="flex items-center justify-between mb-4">
                  <button
                    @click="previousMonth"
                    class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ format(currentMonth, 'MMMM yyyy', { locale: fr }) }}
                  </span>
                  <button
                    @click="nextMonth"
                    class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>

                <!-- Jours de la semaine -->
                <div class="grid grid-cols-7 gap-1 mb-2">
                  <div
                    v-for="day in weekDays"
                    :key="day"
                    class="text-center text-xs font-semibold text-gray-500 py-2"
                  >
                    {{ day }}
                  </div>
                </div>

                <!-- Grille du calendrier -->
                <div class="grid grid-cols-7 gap-1">
                  <div
                    v-for="(day, index) in calendarDays"
                    :key="index"
                    class="aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all"
                    :class="[
                      !day ? 'bg-transparent' :
                      day.isBusy
                        ? 'bg-red-100 text-red-700 border-2 border-red-300 cursor-not-allowed'
                        : day.isSelected
                        ? 'bg-primary-500 text-white border-2 border-primary-600'
                        : day.isToday
                        ? 'bg-primary-50 text-primary-700 border-2 border-primary-300 hover:bg-primary-100 cursor-pointer'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 hover:border-primary-300 cursor-pointer',
                      day && !day.isBusy && 'hover:scale-105'
                    ]"
                    @click="!day || day.isBusy ? null : selectDate(day)"
                  >
                    <span v-if="day">{{ day.date }}</span>
                  </div>
                </div>

                <!-- Légende -->
                <div class="mt-4 flex items-center justify-center space-x-4 text-xs">
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 rounded bg-green-50 border border-green-200"></div>
                    <span class="text-gray-600">Disponible</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 rounded bg-red-100 border-2 border-red-300"></div>
                    <span class="text-gray-600">Réservé</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 rounded bg-primary-500"></div>
                    <span class="text-gray-600">Sélectionné</span>
                  </div>
                </div>
              </div>

              <!-- Formulaire de réservation -->
              <div class="bg-gray-50 rounded-xl p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-6">Détails de la réservation</h3>
                
                <form @submit.prevent="handleReserve" class="space-y-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Lieu de prise en charge</label>
                    <input
                      v-model="form.pickupLocation"
                      type="text"
                      class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Adresse de départ"
                      required
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Lieu de retour</label>
                    <input
                      v-model="form.dropoffLocation"
                      type="text"
                      class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Adresse de retour"
                      required
                    />
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Date de début</label>
                      <input
                        v-model="form.startDate"
                        type="date"
                        :min="minDate"
                        class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Date de fin</label>
                      <input
                        v-model="form.endDate"
                        type="date"
                        :min="form.startDate || minDate"
                        class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Heure de début</label>
                      <input
                        v-model="form.startTime"
                        type="time"
                        class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Heure de fin</label>
                      <input
                        v-model="form.endTime"
                        type="time"
                        class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Raison de la réservation</label>
                    <textarea
                      v-model="form.purpose"
                      rows="3"
                      class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Décrivez la raison de votre réservation"
                    ></textarea>
                  </div>

                  <div v-if="reservationError" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {{ reservationError }}
                  </div>

                  <button
                    type="submit"
                    :disabled="submitting"
                    class="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <svg v-if="!submitting" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span v-if="submitting">Réservation en cours...</span>
                    <span v-else>Confirmer la réservation</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { useVehicleStore } from '~/stores/vehicles'
import { useReservationStore } from '~/stores/reservations'
import { format, getDaysInMonth, startOfMonth, getDay, addMonths, subMonths, isSameDay, isToday } from 'date-fns'
import { fr } from 'date-fns/locale'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  vehicleId: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['close', 'reserved'])

const vehicleStore = useVehicleStore()
const reservationStore = useReservationStore()
const router = useRouter()

const vehicle = ref(null)
const loading = ref(false)
const error = ref('')
const submitting = ref(false)
const reservationError = ref('')
const vehicleReservations = ref([])

const minDate = new Date().toISOString().split('T')[0]
const currentMonth = ref(new Date())
const selectedDate = ref(null)

const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

const form = reactive({
  pickupLocation: '',
  dropoffLocation: '',
  startDate: '',
  endDate: '',
  startTime: '08:00',
  endTime: '18:00',
  purpose: ''
})

const loadVehicleAndReservations = async () => {
  if (!props.vehicleId) return
  
  loading.value = true
  error.value = ''
  
  try {
    vehicle.value = await vehicleStore.fetchVehicle(props.vehicleId)
    const response = await $fetch(`/api/vehicles/${props.vehicleId}/reservations`)
    vehicleReservations.value = response.reservations || []
  } catch (err) {
    error.value = err.data?.message || err.message || 'Erreur lors du chargement du véhicule'
  } finally {
    loading.value = false
  }
}

const calendarDays = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()

  const firstDayOfMonth = startOfMonth(currentMonth.value)
  const startingDayOfWeek = (getDay(firstDayOfMonth) + 6) % 7
  const numDaysInMonth = getDaysInMonth(currentMonth.value)

  const busyDates = new Set()
  for (const r of vehicleReservations.value) {
    const start = new Date(r.startDate)
    const end = new Date(r.endDate)
    start.setHours(0, 0, 0, 0)
    end.setHours(0, 0, 0, 0)
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (d.getMonth() === month && d.getFullYear() === year) {
        busyDates.add(d.toISOString().split('T')[0])
      }
    }
  }

  const days = []
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null)
  }

  for (let i = 1; i <= numDaysInMonth; i++) {
    const date = new Date(year, month, i)
    const iso = date.toISOString().split('T')[0]
    const isBusy = busyDates.has(iso)
    const isSelected = selectedDate.value && isSameDay(date, selectedDate.value)
    const isTodayDate = isToday(date)
    
    days.push({
      date: i,
      iso,
      isBusy,
      isSelected,
      isToday: isTodayDate
    })
  }

  return days
})

const selectDate = (day) => {
  if (!day || day.isBusy) return
  
  const date = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth(), day.date)
  selectedDate.value = date
  
  if (!form.startDate || (form.endDate && date < new Date(form.startDate))) {
    form.startDate = date.toISOString().split('T')[0]
    form.endDate = ''
  } else if (!form.endDate || date > new Date(form.startDate)) {
    form.endDate = date.toISOString().split('T')[0]
  } else {
    form.startDate = date.toISOString().split('T')[0]
    form.endDate = ''
  }
}

const previousMonth = () => {
  currentMonth.value = subMonths(currentMonth.value, 1)
}

const nextMonth = () => {
  currentMonth.value = addMonths(currentMonth.value, 1)
}

const closeModal = () => {
  emit('close')
  vehicle.value = null
  error.value = ''
  reservationError.value = ''
  selectedDate.value = null
  currentMonth.value = new Date()
  Object.assign(form, {
    pickupLocation: '',
    dropoffLocation: '',
    startDate: '',
    endDate: '',
    startTime: '08:00',
    endTime: '18:00',
    purpose: ''
  })
}

const handleReserve = async () => {
  submitting.value = true
  reservationError.value = ''
  
  try {
    await reservationStore.createReservation({
      vehicle: props.vehicleId,
      ...form
    })
    
    emit('reserved')
    closeModal()
    router.push('/reservations')
  } catch (err) {
    reservationError.value = err.data?.message || err.message || 'Erreur lors de la création de la réservation'
  } finally {
    submitting.value = false
  }
}

watch(() => props.isOpen, async (newVal) => {
  if (newVal && props.vehicleId) {
    await loadVehicleAndReservations()
  }
})

watch(() => props.vehicleId, async (newVal) => {
  if (props.isOpen && newVal) {
    await loadVehicleAndReservations()
  }
})

onMounted(() => {
  if (props.isOpen && props.vehicleId) {
    loadVehicleAndReservations()
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
