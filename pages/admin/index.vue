<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>Panneau d'administration</span>
            </h1>
            <p class="text-sm text-gray-600 mt-1">Gérez votre plateforme CarLab</p>
          </div>
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
            <span class="text-2xl font-bold text-gray-900">{{ stats.totalVehicles }}</span>
            <span class="text-sm text-gray-500">total</span>
          </div>
          <p class="text-xs text-gray-500 mt-2">{{ stats.availableVehicles }} disponibles</p>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Disponibles</h3>
            <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div class="flex items-baseline space-x-2">
            <span class="text-2xl font-bold text-gray-900">{{ stats.availableVehicles }}</span>
            <span class="text-sm text-gray-500">véhicules</span>
          </div>
          <p class="text-xs text-gray-500 mt-2">En stock</p>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Réservations</h3>
            <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
          <div class="flex items-baseline space-x-2">
            <span class="text-2xl font-bold text-gray-900">{{ stats.totalReservations }}</span>
            <span class="text-sm text-gray-500">total</span>
          </div>
          <p class="text-xs text-gray-500 mt-2">{{ stats.activeReservations }} actives</p>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Actives</h3>
            <div class="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div class="flex items-baseline space-x-2">
            <span class="text-2xl font-bold text-gray-900">{{ stats.activeReservations }}</span>
            <span class="text-sm text-gray-500">en cours</span>
          </div>
          <p class="text-xs text-gray-500 mt-2">Réservations actives</p>
        </div>
      </div>

      <!-- Actions rapides -->
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <NuxtLink
          to="/admin/vehicles"
          class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all group"
        >
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 rounded-xl bg-primary-100 group-hover:bg-primary-200 flex items-center justify-center transition-colors">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 mb-1">Gérer les véhicules</h3>
              <p class="text-sm text-gray-600">Ajouter, modifier et supprimer des véhicules</p>
            </div>
            <svg class="w-6 h-6 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/admin/reservations"
          class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all group"
        >
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 rounded-xl bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-colors">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 mb-1">Gérer les réservations</h3>
              <p class="text-sm text-gray-600">Voir et gérer toutes les réservations</p>
            </div>
            <svg class="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </NuxtLink>
      </div>

      <!-- Actions rapides -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Actions rapides</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <button
            @click="initAdmin"
            class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
          >
            <div class="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-900">Créer compte admin</p>
              <p class="text-xs text-gray-500">Initialiser admin@carlab.com</p>
            </div>
          </button>
          <button
            @click="loadData"
            class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
          >
            <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-900">Actualiser</p>
              <p class="text-xs text-gray-500">Recharger les données</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVehicleStore } from '~/stores/vehicles'
import { useReservationStore } from '~/stores/reservations'

definePageMeta({
  middleware: 'admin'
})

const vehicleStore = useVehicleStore()
const reservationStore = useReservationStore()

const stats = reactive({
  totalVehicles: 0,
  availableVehicles: 0,
  totalReservations: 0,
  activeReservations: 0
})

onMounted(() => {
  loadData()
})

const loadData = async () => {
  await Promise.all([
    vehicleStore.fetchVehicles(),
    reservationStore.fetchReservations()
  ])
  updateStats()
}

const updateStats = () => {
  stats.totalVehicles = vehicleStore.vehicles.length
  stats.availableVehicles = vehicleStore.vehicles.filter(v => v.status === 'available').length
  stats.totalReservations = reservationStore.reservations.length
  stats.activeReservations = reservationStore.reservations.filter(
    r => r.status === 'active' || r.status === 'confirmed'
  ).length
}

const initAdmin = async () => {
  try {
    const response = await $fetch('/api/admin/init', {
      method: 'POST'
    })
    alert('Compte administrateur créé/mis à jour avec succès!\nEmail: admin@carlab.com\nMot de passe: 12345678')
  } catch (err) {
    alert('Erreur: ' + (err.data?.message || err.message))
  }
}
</script>
