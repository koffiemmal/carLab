<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête amélioré -->
      <div class="mb-8">
        <div class="flex items-center space-x-4 mb-4">
          <div class="relative">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 flex items-center justify-center shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <div class="absolute -top-1 -right-1 w-6 h-6 bg-primary-400 rounded-full flex items-center justify-center">
              <span class="text-xs font-bold text-gray-900">AI</span>
            </div>
          </div>
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Assistant IA de Réservation
            </h1>
            <p class="text-gray-600 mt-1">Laissez l'intelligence artificielle trouver le véhicule parfait pour votre trajet</p>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Formulaire amélioré -->
        <div class="lg:col-span-1">
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6 sticky top-24">
            <div class="flex items-center space-x-2 mb-6">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-semibold text-gray-700">Formulaire de recherche</span>
            </div>
            
            <form @submit.prevent="getRecommendations" class="space-y-5">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-1">
                  <svg class="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>Destination <span class="text-red-500">*</span></span>
                </label>
                <input
                  v-model="form.destination"
                  type="text"
                  required
                  placeholder="Ex: Lomé, Togo"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-1">
                  <svg class="w-4 h-4 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span>Description du trajet <span class="text-red-500">*</span></span>
                </label>
                <textarea
                  v-model="form.description"
                  required
                  rows="5"
                  placeholder="Ex: Voyage d'affaires pour une réunion importante. Je dois transporter 3 personnes et du matériel. Trajet sur route goudronnée principalement."
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                ></textarea>
                <p class="text-xs text-gray-500 mt-2 flex items-center space-x-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Décrivez : nombre de passagers, type de route, matériel, etc.</span>
                </p>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">Date de début</label>
                  <input
                    v-model="form.startDate"
                    type="date"
                    :min="minDate"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">Date de fin</label>
                  <input
                    v-model="form.endDate"
                    type="date"
                    :min="form.startDate || minDate"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 transform hover:scale-[1.02]"
              >
                <svg v-if="loading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span>{{ loading ? 'Analyse en cours...' : 'Obtenir des recommandations' }}</span>
              </button>
            </form>
          </div>
        </div>

        <!-- Résultats améliorés -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Analyse IA améliorée -->
          <div v-if="analysis" class="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl p-6 shadow-xl text-white">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold mb-2 flex items-center space-x-2">
                  <span>Analyse IA</span>
                  <span class="text-xs bg-white/20 px-2 py-1 rounded-full">Powered by Gemini</span>
                </h3>
                <p class="text-white/90 leading-relaxed">{{ analysis }}</p>
              </div>
            </div>
          </div>

          <!-- Recommandations améliorées -->
          <div v-if="recommendations.length > 0">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-2xl font-bold text-gray-900">Véhicules recommandés</h2>
              <span class="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{{ recommendations.length }} résultat(s)</span>
            </div>
            
            <div class="space-y-4">
              <div
                v-for="(rec, index) in recommendations"
                :key="rec.vehicle._id"
                class="group bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-primary-300 relative overflow-hidden"
              >
                <!-- Badge de classement -->
                <div class="absolute top-4 right-4">
                  <div class="relative">
                    <div class="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      #{{ index + 1 }}
                    </div>
                    <div class="absolute -bottom-1 -right-1 bg-accent-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {{ rec.score }}/10
                    </div>
                  </div>
                </div>

                <div class="flex items-start space-x-4 mb-4">
                  <!-- Image du véhicule -->
                  <div v-if="rec.vehicle.image" class="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                    <img
                      :src="getImageUrl(rec.vehicle.image)"
                      :alt="`${rec.vehicle.brand} ${rec.vehicle.model}`"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      @error="handleImageError"
                    />
                  </div>
                  <div v-else class="w-32 h-32 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                    <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                    </svg>
                  </div>

                  <!-- Informations du véhicule -->
                  <div class="flex-1 min-w-0">
                    <h3 class="text-2xl font-bold text-gray-900 mb-1">
                      {{ rec.vehicle.brand }} {{ rec.vehicle.model }} {{ rec.vehicle.year }}
                    </h3>
                    <div class="flex flex-wrap items-center gap-3 mb-3">
                      <span class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                        {{ rec.vehicle.type }}
                      </span>
                      <div class="flex items-center space-x-1 text-gray-600">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        <span class="text-sm font-medium">{{ rec.vehicle.seats }} places</span>
                      </div>
                      <div class="flex items-center space-x-1 text-gray-600">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                        <span class="text-sm font-medium">{{ rec.vehicle.mileage }} km</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Raison de la recommandation -->
                <div class="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 mb-4 border-l-4 border-primary-500">
                  <div class="flex items-start space-x-2">
                    <svg class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <p class="font-semibold text-gray-900 mb-1">Pourquoi ce véhicule ?</p>
                      <p class="text-gray-700 leading-relaxed">{{ rec.reason }}</p>
                    </div>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div class="flex items-center space-x-4 text-sm text-gray-600">
                    <div class="flex items-center space-x-1">
                      <svg class="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span class="font-medium">Recommandé par IA</span>
                    </div>
                  </div>
                  <NuxtLink
                    :to="`/vehicles/${rec.vehicle._id}/reserve`"
                    class="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                  >
                    <span>Réserver maintenant</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- État vide amélioré -->
          <div v-if="!loading && recommendations.length === 0 && !analysis" class="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 mb-4">
              <svg class="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Prêt à trouver votre véhicule idéal ?</h3>
            <p class="text-gray-600 mb-6">Remplissez le formulaire ci-contre et laissez l'IA vous recommander les meilleurs véhicules pour votre trajet</p>
            <div class="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span>Powered by Google Gemini AI</span>
            </div>
          </div>

          <!-- Erreur améliorée -->
          <div v-if="error" class="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
            <div class="flex items-start space-x-3">
              <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-red-900 mb-1">Erreur</h4>
                <p class="text-red-700">{{ error }}</p>
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

definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()

const form = reactive({
  destination: '',
  description: '',
  startDate: '',
  endDate: ''
})

const recommendations = ref([])
const analysis = ref('')
const loading = ref(false)
const error = ref('')
const minDate = new Date().toISOString().split('T')[0]

const getRecommendations = async () => {
  loading.value = true
  error.value = ''
  recommendations.value = []
  analysis.value = ''

  try {
    const response = await $fetch('/api/ai/recommend', {
      method: 'POST',
      body: form
    })

    recommendations.value = response.recommendations || []
    analysis.value = response.analysis || ''
  } catch (err) {
    error.value = err.data?.message || err.message || 'Erreur lors de la génération des recommandations'
    console.error('Erreur recommandation:', err)
  } finally {
    loading.value = false
  }
}

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
  event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="20" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EImage non disponible%3C/text%3E%3C/svg%3E'
}
</script>
