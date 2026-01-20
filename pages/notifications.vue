<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span>Notifications</span>
            </h1>
            <p class="text-sm text-gray-600 mt-1">Restez informé de vos réservations et activités</p>
          </div>
          <button
            v-if="notifications.length > 0"
            @click="markAllAsRead"
            class="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors"
          >
            Tout marquer comme lu
          </button>
        </div>
      </div>

      <!-- État vide -->
      <div v-if="notifications.length === 0" class="text-center py-20 bg-white rounded-xl border border-gray-200">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
        </div>
        <p class="text-gray-600 text-base font-medium mb-1">Aucune notification</p>
        <p class="text-gray-500 text-sm">Vous serez notifié de vos activités importantes</p>
      </div>

      <!-- Liste des notifications -->
      <div v-else class="space-y-3">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="[
            'bg-white rounded-xl border p-4 transition-all hover:shadow-md',
            notification.read ? 'border-gray-200' : 'border-primary-200 bg-primary-50'
          ]"
        >
          <div class="flex items-start space-x-3">
            <div :class="[
              'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
              getNotificationIconClass(notification.type)
            ]">
              <svg class="w-5 h-5" :class="getNotificationIconColor(notification.type)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getNotificationIcon(notification.type)"></path>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <p :class="[
                    'text-sm font-semibold',
                    notification.read ? 'text-gray-900' : 'text-gray-900'
                  ]">
                    {{ notification.title }}
                  </p>
                  <p class="text-sm text-gray-600 mt-1">{{ notification.message }}</p>
                  <p class="text-xs text-gray-500 mt-2">{{ formatDate(notification.date) }}</p>
                </div>
                <button
                  v-if="!notification.read"
                  @click="markAsRead(notification.id)"
                  class="ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </button>
              </div>
              <div v-if="notification.actionUrl" class="mt-3">
                <NuxtLink
                  :to="notification.actionUrl"
                  class="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Voir les détails →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const notifications = ref([
  {
    id: 1,
    type: 'reservation',
    title: 'Réservation confirmée',
    message: 'Votre réservation pour la Toyota Camry a été confirmée',
    date: new Date(),
    read: false,
    actionUrl: '/reservations'
  },
  {
    id: 2,
    type: 'reminder',
    title: 'Rappel de réservation',
    message: 'Votre réservation commence demain à 08:00',
    date: new Date(Date.now() - 3600000),
    read: false,
    actionUrl: '/reservations'
  },
  {
    id: 3,
    type: 'system',
    title: 'Mise à jour du système',
    message: 'Nouvelles fonctionnalités disponibles sur CarLab',
    date: new Date(Date.now() - 86400000),
    read: true,
    actionUrl: null
  }
])

const formatDate = (date) => {
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'À l\'instant'
  if (minutes < 60) return `Il y a ${minutes} min`
  if (hours < 24) return `Il y a ${hours}h`
  if (days < 7) return `Il y a ${days}j`
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

const getNotificationIcon = (type) => {
  const icons = {
    reservation: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    reminder: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    system: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  }
  return icons[type] || icons.system
}

const getNotificationIconClass = (type) => {
  const classes = {
    reservation: 'bg-primary-100',
    reminder: 'bg-yellow-100',
    system: 'bg-gray-100',
    success: 'bg-green-100'
  }
  return classes[type] || classes.system
}

const getNotificationIconColor = (type) => {
  const colors = {
    reservation: 'text-primary-600',
    reminder: 'text-yellow-600',
    system: 'text-gray-600',
    success: 'text-green-600'
  }
  return colors[type] || colors.system
}

const markAsRead = (id) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}
</script>
