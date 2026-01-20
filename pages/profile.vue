<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span>Mon Profil</span>
        </h1>
        <p class="text-sm text-gray-600 mt-1">Gérez vos informations personnelles</p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <!-- Informations personnelles -->
        <div class="md:col-span-2 space-y-6">
          <!-- Informations de base -->
          <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Informations personnelles</h2>
            <div class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                  <input
                    v-model="profile.firstName"
                    type="text"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                  <input
                    v-model="profile.lastName"
                    type="text"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  v-model="profile.email"
                  type="email"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                <input
                  v-model="profile.phone"
                  type="tel"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
            </div>
            <button
              @click="saveProfile"
              class="mt-6 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Enregistrer les modifications
            </button>
          </div>

          <!-- Mot de passe -->
          <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Changer le mot de passe</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Mot de passe actuel</label>
                <input
                  v-model="passwordForm.currentPassword"
                  type="password"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nouveau mot de passe</label>
                <input
                  v-model="passwordForm.newPassword"
                  type="password"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Confirmer le mot de passe</label>
                <input
                  v-model="passwordForm.confirmPassword"
                  type="password"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              @click="changePassword"
              class="mt-6 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Changer le mot de passe
            </button>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Photo de profil -->
          <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-center">
            <div class="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-2xl">
                {{ authStore.user?.firstName?.charAt(0) }}{{ authStore.user?.lastName?.charAt(0) }}
              </span>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-1">{{ authStore.fullName }}</h3>
            <p class="text-sm text-gray-500 mb-4">{{ authStore.user?.email }}</p>
            <button class="text-sm text-primary-600 hover:text-primary-700 font-semibold">
              Changer la photo
            </button>
          </div>

          <!-- Statistiques -->
          <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Statistiques</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Réservations totales</span>
                <span class="text-sm font-semibold text-gray-900">{{ totalReservations }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Réservations actives</span>
                <span class="text-sm font-semibold text-gray-900">{{ activeReservations }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Membre depuis</span>
                <span class="text-sm font-semibold text-gray-900">{{ memberSince }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { useReservationStore } from '~/stores/reservations'

definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
const reservationStore = useReservationStore()

const profile = reactive({
  firstName: authStore.user?.firstName || '',
  lastName: authStore.user?.lastName || '',
  email: authStore.user?.email || '',
  phone: ''
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const totalReservations = ref(0)
const activeReservations = ref(0)
const memberSince = ref('')

onMounted(async () => {
  try {
    await reservationStore.fetchReservations()
    totalReservations.value = reservationStore.reservations.length
    activeReservations.value = reservationStore.reservations.filter(r => r.status === 'active' || r.status === 'confirmed').length
    
    if (authStore.user?.createdAt) {
      memberSince.value = new Date(authStore.user.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
  }
})

const saveProfile = async () => {
  // TODO: Implémenter la sauvegarde du profil
  alert('Fonctionnalité à implémenter')
}

const changePassword = async () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    alert('Les mots de passe ne correspondent pas')
    return
  }
  // TODO: Implémenter le changement de mot de passe
  alert('Fonctionnalité à implémenter')
}
</script>
