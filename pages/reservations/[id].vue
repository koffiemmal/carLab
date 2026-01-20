<template>
  <div>
    <div class="max-w-4xl mx-auto">
      <NuxtLink to="/reservations" class="text-primary-600 hover:text-primary-700 mb-4 inline-block">
        ← Retour aux réservations
      </NuxtLink>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>

      <div v-else-if="reservation" class="card p-6">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h1 class="text-3xl font-bold mb-2">
              {{ reservation.vehicle.brand }} {{ reservation.vehicle.model }} {{ reservation.vehicle.year }}
            </h1>
            <p class="text-gray-600">{{ reservation.vehicle.type }} • {{ reservation.vehicle.licensePlate }}</p>
          </div>
          <span
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium',
              statusClasses[reservation.status]
            ]"
          >
            {{ statusLabels[reservation.status] }}
          </span>
        </div>

        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <div class="card p-4">
            <h3 class="font-semibold mb-3">Informations de prise en charge</h3>
            <p class="text-gray-600 mb-1">Lieu</p>
            <p class="font-medium mb-3">{{ reservation.pickupLocation || 'Non spécifié' }}</p>
            <p class="text-gray-600 mb-1">Date et heure</p>
            <p class="font-medium">{{ formatDateTime(reservation.startDate, reservation.startTime) }}</p>
          </div>

          <div class="card p-4">
            <h3 class="font-semibold mb-3">Informations de retour</h3>
            <p class="text-gray-600 mb-1">Lieu</p>
            <p class="font-medium mb-3">{{ reservation.dropoffLocation || 'Non spécifié' }}</p>
            <p class="text-gray-600 mb-1">Date et heure</p>
            <p class="font-medium">{{ formatDateTime(reservation.endDate, reservation.endTime) }}</p>
          </div>
        </div>

        <div v-if="reservation.purpose" class="card p-4 mb-6">
          <h3 class="font-semibold mb-2">Raison de la réservation</h3>
          <p class="text-gray-800">{{ reservation.purpose }}</p>
        </div>

        <div v-if="reservation.notes" class="card p-4 mb-6">
          <h3 class="font-semibold mb-2">Notes</h3>
          <p class="text-gray-800">{{ reservation.notes }}</p>
        </div>

        <div class="flex justify-end space-x-2">
          <button
            v-if="canCancel"
            @click="handleCancel"
            class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            :disabled="cancelling"
          >
            {{ cancelling ? 'Annulation...' : 'Annuler la réservation' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useReservationStore } from '~/stores/reservations'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const reservationStore = useReservationStore()

const reservation = ref(null)
const loading = ref(true)
const cancelling = ref(false)

const statusLabels = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  active: 'Active',
  completed: 'Terminée',
  cancelled: 'Annulée'
}

const statusClasses = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  active: 'bg-blue-100 text-blue-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800'
}

const canCancel = computed(() => {
  return reservation.value && 
         reservation.value.status !== 'cancelled' && 
         reservation.value.status !== 'completed'
})

onMounted(async () => {
  try {
    reservation.value = await reservationStore.fetchReservation(route.params.id)
  } catch (error) {
    console.error('Erreur lors du chargement de la réservation:', error)
  } finally {
    loading.value = false
  }
})

const formatDateTime = (date, time) => {
  const dateStr = format(new Date(date), 'dd MMM yyyy', { locale: fr })
  return `${dateStr} à ${time}`
}

const handleCancel = async () => {
  if (!confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
    return
  }

  cancelling.value = true
  try {
    await reservationStore.cancelReservation(reservation.value._id)
    router.push('/reservations')
  } catch (error) {
    alert(error.data?.message || 'Erreur lors de l\'annulation')
  } finally {
    cancelling.value = false
  }
}
</script>
