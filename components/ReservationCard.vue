<template>
  <div class="card p-6">
    <div class="flex justify-between items-start mb-6">
      <div class="flex-1">
        <h3 class="text-2xl font-bold text-gray-900 mb-2">
          {{ reservation.vehicle.brand }} {{ reservation.vehicle.model }} {{ reservation.vehicle.year }}
        </h3>
        <p class="text-gray-600 mb-1">{{ reservation.vehicle.type }} • {{ reservation.vehicle.licensePlate }}</p>
        <p class="text-sm text-gray-500">{{ formatDate(reservation.startDate) }} - {{ formatDate(reservation.endDate) }}</p>
      </div>
      <span
        :class="[
          'px-4 py-2 rounded-full text-sm font-semibold',
          statusClasses[reservation.status]
        ]"
      >
        {{ statusLabels[reservation.status] }}
      </span>
    </div>

    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <div class="flex items-start space-x-3">
        <div class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 mb-1">Prise en charge</p>
          <p class="font-semibold text-gray-900">{{ reservation.pickupLocation || 'Non spécifié' }}</p>
          <p class="text-sm text-gray-500 mt-1">{{ reservation.startTime }}</p>
        </div>
      </div>
      <div class="flex items-start space-x-3">
        <div class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 mb-1">Retour</p>
          <p class="font-semibold text-gray-900">{{ reservation.dropoffLocation || 'Non spécifié' }}</p>
          <p class="text-sm text-gray-500 mt-1">{{ reservation.endTime }}</p>
        </div>
      </div>
    </div>

    <div v-if="reservation.purpose" class="mb-6 p-4 bg-gray-50 rounded-xl">
      <p class="text-sm font-medium text-gray-500 mb-1">Raison</p>
      <p class="text-gray-900">{{ reservation.purpose }}</p>
    </div>

    <div class="flex justify-end space-x-3">
      <button
        v-if="canCancel"
        @click="handleCancel"
        class="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all shadow-sm hover:shadow-md"
        :disabled="cancelling"
      >
        {{ cancelling ? 'Annulation...' : 'Annuler' }}
      </button>
      <NuxtLink
        :to="`/reservations/${reservation._id}`"
        class="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md"
      >
        Voir les détails
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useReservationStore } from '~/stores/reservations'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const props = defineProps({
  reservation: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['refresh'])

const reservationStore = useReservationStore()
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
  return props.reservation.status !== 'cancelled' && 
         props.reservation.status !== 'completed'
})

const formatDate = (date) => {
  return format(new Date(date), 'dd MMM yyyy', { locale: fr })
}

const handleCancel = async () => {
  if (!confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
    return
  }

  cancelling.value = true
  try {
    await reservationStore.cancelReservation(props.reservation._id)
    emit('refresh')
  } catch (error) {
    alert(error.data?.message || 'Erreur lors de l\'annulation')
  } finally {
    cancelling.value = false
  }
}
</script>
