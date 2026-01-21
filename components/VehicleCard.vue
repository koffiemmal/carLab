<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all duration-200">
    <div class="relative h-56 bg-gray-100">
      <img
        v-if="vehicle.image"
        :src="getImageUrl(vehicle.image)"
        :alt="`${vehicle.brand} ${vehicle.model}`"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        @error="handleImageError"
      />
      <div v-if="vehicle.image" class="hidden absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <svg class="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </div>
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <svg class="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </div>
      <div class="absolute top-3 right-3 flex space-x-2">
        <button class="w-9 h-9 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-all shadow-md hover:shadow-lg">
          <svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
        </button>
        <button class="w-9 h-9 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-all shadow-md hover:shadow-lg">
          <svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="p-5">
      <h3 class="text-lg font-bold text-gray-900 mb-2">
        {{ vehicle.brand }} {{ vehicle.model }} {{ vehicle.year }} - Auto
      </h3>
      
      <div class="flex items-center space-x-4 mb-4">
        <div class="flex items-center space-x-1">
          <svg class="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span class="text-sm font-semibold text-gray-900">4.8</span>
        </div>
        <div class="flex items-center space-x-1">
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span class="text-sm text-gray-600">{{ vehicle.mileage }} miles</span>
        </div>
        <div class="flex items-center space-x-1">
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span class="text-sm text-gray-600">52 trips</span>
        </div>
      </div>
      
      <div class="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <span class="text-2xl font-bold text-gray-900">$80</span>
          <span class="text-sm text-gray-500 ml-1">Day</span>
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="$emit('view-details', vehicle._id)"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2.5 rounded-xl transition-all text-sm whitespace-nowrap"
          >
            Voir détails
          </button>
          <button
            @click="$emit('reserve', vehicle._id)"
            class="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md text-sm whitespace-nowrap"
          >
            Réserver
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  vehicle: {
    type: Object,
    required: true
  },
  searchForm: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['view-details', 'reserve'])

const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  if (imagePath.startsWith('/api/')) {
    return imagePath
  }
  if (imagePath.startsWith('/uploads/')) {
    return `/api${imagePath}`
  }
  const filename = imagePath.split('/').pop()
  return `/api/uploads/vehicles/${filename}`
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
  event.target.nextElementSibling?.classList.remove('hidden')
}
</script>
