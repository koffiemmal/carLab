<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center space-x-3 mb-2">
              <NuxtLink
                to="/admin"
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </NuxtLink>
              <h1 class="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
                <span>Gestion des véhicules</span>
              </h1>
            </div>
            <p class="text-sm text-gray-600">Ajouter, modifier et supprimer des véhicules</p>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Formulaire d'ajout -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-bold text-gray-900">
                {{ editingVehicle ? 'Modifier le véhicule' : 'Ajouter un véhicule' }}
              </h2>
              <button
                v-if="editingVehicle"
                @click="cancelEdit"
                type="button"
                class="text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                Annuler
              </button>
            </div>
            <form @submit.prevent="editingVehicle ? handleUpdateVehicle() : handleAddVehicle()" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Marque</label>
                  <input
                    v-model="vehicleForm.brand"
                    type="text"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                    placeholder="Toyota"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Modèle</label>
                  <input
                    v-model="vehicleForm.model"
                    type="text"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                    placeholder="Camry"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Année</label>
                  <input
                    v-model="vehicleForm.year"
                    type="number"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                    :min="2000"
                    :max="new Date().getFullYear() + 1"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Plaque d'immatriculation</label>
                  <input
                    v-model="vehicleForm.licensePlate"
                    type="text"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                    placeholder="ABC-123"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                  <select
                    v-model="vehicleForm.type"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionner</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Pickup">Pickup</option>
                    <option value="Van">Van</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Couleur</label>
                  <input
                    v-model="vehicleForm.color"
                    type="text"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Noir"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Nombre de places</label>
                  <input
                    v-model="vehicleForm.seats"
                    type="number"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                    min="1"
                    max="20"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Kilométrage</label>
                  <input
                    v-model="vehicleForm.mileage"
                    type="number"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Statut</label>
                <select
                  v-model="vehicleForm.status"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="available">Disponible</option>
                  <option value="unavailable">Indisponible</option>
                  <option value="maintenance">En maintenance</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Image du véhicule</label>
                
                <!-- Option 1: Upload depuis le PC -->
                <div class="mb-4">
                  <label class="block text-xs font-semibold text-gray-700 mb-2">Télécharger depuis votre PC</label>
                  <div class="flex items-center space-x-3">
                    <label class="flex-1 cursor-pointer">
                      <input
                        ref="fileInput"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                        @change="handleFileSelect"
                        class="hidden"
                      />
                      <div class="w-full px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 transition-colors text-center">
                        <div class="flex flex-col items-center">
                          <svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                          </svg>
                          <span class="text-sm text-gray-600">
                            {{ selectedFile ? selectedFile.name : 'Cliquez pour sélectionner une image' }}
                          </span>
                          <span class="text-xs text-gray-500 mt-1">JPEG, PNG, GIF ou WebP (max 5MB)</span>
                        </div>
                      </div>
                    </label>
                    <button
                      v-if="selectedFile"
                      @click="uploadImage"
                      type="button"
                      :disabled="uploading"
                      class="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm disabled:opacity-50 whitespace-nowrap"
                    >
                      {{ uploading ? 'Upload...' : 'Uploader' }}
                    </button>
                  </div>
                </div>

                <!-- Option 2: URL externe -->
                <div class="mb-3">
                  <label class="block text-xs font-semibold text-gray-700 mb-2">Ou entrer une URL d'image</label>
                  <input
                    v-model="vehicleForm.image"
                    type="url"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <!-- Aperçu de l'image -->
                <div v-if="vehicleForm.image || imagePreview" class="mt-3">
                  <label class="block text-xs font-semibold text-gray-700 mb-2">Aperçu</label>
                  <div class="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      :src="imagePreview || vehicleForm.image"
                      :alt="`${vehicleForm.brand} ${vehicleForm.model}`"
                      class="w-full h-full object-cover"
                      @error="handleImageError"
                      @load="imageError = false"
                    />
                    <div v-if="imageError" class="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div class="text-center">
                        <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p class="text-xs text-gray-500">Image non disponible</p>
                      </div>
                    </div>
                    <button
                      v-if="vehicleForm.image || imagePreview"
                      @click="clearImage"
                      type="button"
                      class="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  v-model="vehicleForm.description"
                  rows="3"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Description du véhicule..."
                ></textarea>
              </div>
              <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {{ error }}
              </div>
              <button
                type="submit"
                :disabled="submitting"
                class="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm disabled:opacity-50"
              >
                {{ submitting 
                  ? (editingVehicle ? 'Mise à jour...' : 'Ajout...') 
                  : (editingVehicle ? 'Mettre à jour le véhicule' : 'Ajouter le véhicule') 
                }}
              </button>
            </form>
          </div>
        </div>

        <!-- Statistiques -->
        <div class="space-y-6">
          <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Statistiques</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center pb-4 border-b border-gray-100">
                <span class="text-gray-600 font-medium text-sm">Total véhicules</span>
                <span class="text-2xl font-bold text-primary-600">{{ vehicleStore.vehicles.length }}</span>
              </div>
              <div class="flex justify-between items-center pb-4 border-b border-gray-100">
                <span class="text-gray-600 font-medium text-sm">Disponibles</span>
                <span class="text-2xl font-bold text-green-600">{{ availableCount }}</span>
              </div>
              <div class="flex justify-between items-center pb-4 border-b border-gray-100">
                <span class="text-gray-600 font-medium text-sm">Indisponibles</span>
                <span class="text-2xl font-bold text-red-600">{{ unavailableCount }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 font-medium text-sm">En maintenance</span>
                <span class="text-2xl font-bold text-yellow-600">{{ maintenanceCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Liste des véhicules -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mt-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-gray-900">Tous les véhicules</h2>
          <span class="text-sm text-gray-500">{{ vehicleStore.vehicles.length }} véhicules</span>
        </div>
        <div v-if="vehicleStore.loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          <p class="mt-4 text-gray-600 text-sm">Chargement...</p>
        </div>
        <div v-else-if="vehicleStore.vehicles.length === 0" class="text-center py-12">
          <p class="text-gray-600 text-sm">Aucun véhicule</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="vehicle in vehicleStore.vehicles"
            :key="vehicle._id"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex items-start justify-between mb-3">
              <div>
                <h3 class="font-bold text-gray-900">{{ vehicle.brand }} {{ vehicle.model }}</h3>
                <p class="text-sm text-gray-500">{{ vehicle.year }} • {{ vehicle.licensePlate }}</p>
              </div>
              <span :class="[
                'px-2 py-1 rounded text-xs font-semibold',
                vehicle.status === 'available' ? 'bg-green-100 text-green-800' : '',
                vehicle.status === 'unavailable' ? 'bg-red-100 text-red-800' : '',
                vehicle.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : ''
              ]">
                {{ vehicle.status === 'available' ? 'Disponible' : vehicle.status === 'unavailable' ? 'Indisponible' : 'Maintenance' }}
              </span>
            </div>
            <div class="space-y-2 text-sm text-gray-600 mb-4">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
                <span>{{ vehicle.type }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <span>{{ vehicle.seats }} places</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                <span>{{ vehicle.mileage }} km</span>
              </div>
            </div>
            <div class="flex space-x-2">
              <button
                @click="editVehicle(vehicle)"
                class="flex-1 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors"
              >
                Modifier
              </button>
              <button
                @click="deleteVehicle(vehicle._id)"
                class="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVehicleStore } from '~/stores/vehicles'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  middleware: 'admin'
})

const vehicleStore = useVehicleStore()

const vehicleForm = reactive({
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  licensePlate: '',
  type: '',
  seats: 5,
  color: '',
  mileage: 0,
  image: '',
  description: '',
  status: 'available'
})

const submitting = ref(false)
const error = ref('')
const imageError = ref(false)
const editingVehicle = ref(null)
const selectedFile = ref(null)
const imagePreview = ref(null)
const uploading = ref(false)
const fileInput = ref(null)

const availableCount = computed(() => {
  return vehicleStore.vehicles.filter(v => v.status === 'available').length
})

const unavailableCount = computed(() => {
  return vehicleStore.vehicles.filter(v => v.status === 'unavailable').length
})

const maintenanceCount = computed(() => {
  return vehicleStore.vehicles.filter(v => v.status === 'maintenance').length
})

onMounted(() => {
  vehicleStore.fetchVehicles()
})

const handleAddVehicle = async () => {
  submitting.value = true
  error.value = ''

  try {
    // Si une image est sélectionnée, l'uploader d'abord
    if (selectedFile.value) {
      uploading.value = true
      try {
        const formData = new FormData()
        formData.append('image', selectedFile.value)

        const authStore = useAuthStore()
        const token = authStore.token
        
        const response = await fetch('/api/upload/image', {
          method: 'POST',
          headers: token ? {
            'Authorization': `Bearer ${token}`
          } : {},
          body: formData
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Erreur lors de l\'upload')
        }

        const data = await response.json()
        vehicleForm.image = data.url
        imagePreview.value = null
        selectedFile.value = null
        
        // Réinitialiser l'input file
        if (fileInput.value) {
          fileInput.value.value = ''
        }
      } catch (uploadErr) {
        error.value = uploadErr.message || 'Erreur lors de l\'upload de l\'image'
        submitting.value = false
        uploading.value = false
        return
      } finally {
        uploading.value = false
      }
    }

    await $fetch('/api/vehicles', {
      method: 'POST',
      body: vehicleForm
    })

    resetForm()
    await vehicleStore.fetchVehicles()
  } catch (err) {
    error.value = err.data?.message || err.message || 'Erreur lors de l\'ajout du véhicule'
  } finally {
    submitting.value = false
  }
}

const handleUpdateVehicle = async () => {
  if (!editingVehicle.value) return
  
  submitting.value = true
  error.value = ''

  try {
    // Si une nouvelle image est sélectionnée, l'uploader d'abord
    if (selectedFile.value) {
      uploading.value = true
      try {
        const formData = new FormData()
        formData.append('image', selectedFile.value)

        const authStore = useAuthStore()
        const token = authStore.token
        
        const response = await fetch('/api/upload/image', {
          method: 'POST',
          headers: token ? {
            'Authorization': `Bearer ${token}`
          } : {},
          body: formData
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Erreur lors de l\'upload')
        }

        const data = await response.json()
        vehicleForm.image = data.url
        imagePreview.value = null
        selectedFile.value = null
        
        // Réinitialiser l'input file
        if (fileInput.value) {
          fileInput.value.value = ''
        }
      } catch (uploadErr) {
        error.value = uploadErr.message || 'Erreur lors de l\'upload de l\'image'
        submitting.value = false
        uploading.value = false
        return
      } finally {
        uploading.value = false
      }
    }

    // Mettre à jour le véhicule avec toutes les informations (y compris la nouvelle image)
    await $fetch(`/api/vehicles/${editingVehicle.value._id}`, {
      method: 'PATCH',
      body: vehicleForm
    })

    resetForm()
    await vehicleStore.fetchVehicles()
  } catch (err) {
    error.value = err.data?.message || err.message || 'Erreur lors de la mise à jour du véhicule'
  } finally {
    submitting.value = false
  }
}

const editVehicle = (vehicle) => {
  editingVehicle.value = vehicle
  Object.assign(vehicleForm, {
    brand: vehicle.brand || '',
    model: vehicle.model || '',
    year: vehicle.year || new Date().getFullYear(),
    licensePlate: vehicle.licensePlate || '',
    type: vehicle.type || '',
    seats: vehicle.seats || 5,
    color: vehicle.color || '',
    mileage: vehicle.mileage || 0,
    image: vehicle.image || '',
    description: vehicle.description || '',
    status: vehicle.status || 'available'
  })
  imageError.value = false
  selectedFile.value = null
  imagePreview.value = null
  
  // Réinitialiser l'input file
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  
  // Scroll vers le formulaire après un court délai pour laisser le DOM se mettre à jour
  nextTick(() => {
    const formElement = document.querySelector('.bg-white.rounded-xl.border.border-gray-200.p-6.shadow-sm.mb-6')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}

const cancelEdit = () => {
  editingVehicle.value = null
  resetForm()
}

const resetForm = () => {
  Object.assign(vehicleForm, {
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    licensePlate: '',
    type: '',
    seats: 5,
    color: '',
    mileage: 0,
    image: '',
    description: '',
    status: 'available'
  })
  imageError.value = false
  editingVehicle.value = null
  selectedFile.value = null
  imagePreview.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const deleteVehicle = async (id) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
    return
  }

  try {
    await $fetch(`/api/vehicles/${id}`, {
      method: 'DELETE'
    })
    await vehicleStore.fetchVehicles()
  } catch (err) {
    alert('Erreur lors de la suppression: ' + (err.data?.message || err.message))
  }
}

const handleImageError = () => {
  imageError.value = true
}

const handleFileSelect = (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  // Vérifier le type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    error.value = 'Type de fichier non autorisé. Formats acceptés: JPEG, PNG, GIF, WebP'
    return
  }

  // Vérifier la taille (max 5MB)
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    error.value = 'Fichier trop volumineux. Taille maximale: 5MB'
    return
  }

  selectedFile.value = file
  error.value = ''

  // Créer un aperçu local
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const uploadImage = async () => {
  if (!selectedFile.value) return

  uploading.value = true
  error.value = ''

  try {
    const formData = new FormData()
    formData.append('image', selectedFile.value)

    // Utiliser fetch natif pour FormData
    const authStore = useAuthStore()
    const token = authStore.token
    
    const response = await fetch('/api/upload/image', {
      method: 'POST',
      headers: token ? {
        'Authorization': `Bearer ${token}`
      } : {},
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erreur lors de l\'upload')
    }

    const data = await response.json()
    vehicleForm.image = data.url
    imagePreview.value = null
    selectedFile.value = null
    
    // Réinitialiser l'input file
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  } catch (err) {
    error.value = err.message || 'Erreur lors de l\'upload de l\'image'
  } finally {
    uploading.value = false
  }
}

const clearImage = () => {
  vehicleForm.image = ''
  imagePreview.value = null
  selectedFile.value = null
  imageError.value = false
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>
