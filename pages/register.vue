<template>
  <div class="min-h-screen flex">
    <!-- Partie gauche avec image de fond -->
    <div class="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
      <div class="absolute inset-0 bg-black/20"></div>
      
      <!-- Image de fond de voiture -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80')] bg-cover bg-center opacity-30"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent"></div>
      </div>

      <!-- Contenu de la partie gauche -->
      <div class="relative z-10 flex flex-col justify-between p-12 text-white">
        <div>
          <div class="flex items-center space-x-3 mb-8">
            <img :src="logoImage" alt="CarLab" class="h-14 w-auto" />
            <div>
              <h1 class="text-3xl font-bold">CarLab</h1>
              <p class="text-primary-100 text-sm">Gestion de réservations</p>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div>
            <h2 class="text-4xl font-bold mb-4">Rejoignez CarLab</h2>
            <p class="text-lg text-primary-100 leading-relaxed">
              Créez votre compte et commencez à réserver vos véhicules en toute simplicité. 
              Inscription rapide et gratuite.
            </p>
          </div>

          <div class="flex items-center space-x-4 pt-6 border-t border-white/20">
            <div class="flex -space-x-2">
              <div class="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 backdrop-blur-sm"></div>
              <div class="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 backdrop-blur-sm"></div>
              <div class="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 backdrop-blur-sm"></div>
            </div>
            <div>
              <p class="text-sm font-medium">2K+ utilisateurs</p>
              <div class="flex items-center space-x-1 mt-1">
                <span class="text-yellow-300">★★★★★</span>
                <span class="text-xs text-primary-100">10M+ confiance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Partie droite avec formulaire -->
    <div class="flex-1 flex items-center justify-center bg-white p-8">
      <div class="w-full max-w-md space-y-8">
        <!-- Logo mobile -->
        <div class="lg:hidden flex justify-center mb-8">
          <img :src="logoImage" alt="CarLab" class="h-16 w-auto" />
        </div>

        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Créer un compte</h2>
          <p class="text-gray-600">
            Déjà un compte ?
            <NuxtLink to="/login" class="font-semibold text-primary-600 hover:text-primary-700">
              Se connecter
            </NuxtLink>
          </p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <div class="space-y-5">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-semibold text-gray-900 mb-2">
                  Prénom
                </label>
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  required
                  class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white text-gray-900 placeholder-gray-400"
                  placeholder="Jean"
                />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-semibold text-gray-900 mb-2">
                  Nom
                </label>
                <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  required
                  class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white text-gray-900 placeholder-gray-400"
                  placeholder="Dupont"
                />
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-semibold text-gray-900 mb-2">
                Adresse email
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                  </svg>
                </div>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white text-gray-900 placeholder-gray-400"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-semibold text-gray-900 mb-2">
                Mot de passe
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                  minlength="6"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white text-gray-900 placeholder-gray-400"
                  placeholder="••••••••"
                />
              </div>
              <p class="mt-2 text-xs text-gray-500">Minimum 6 caractères</p>
            </div>
          </div>

          <div class="flex items-center">
            <input
              id="terms"
              type="checkbox"
              required
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-600">
              J'accepte les
              <a href="#" class="text-primary-600 hover:text-primary-700 font-semibold">conditions d'utilisation</a>
              et la
              <a href="#" class="text-primary-600 hover:text-primary-700 font-semibold">politique de confidentialité</a>
            </label>
          </div>

          <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm font-medium text-red-800">Erreur</p>
                <p class="text-sm text-red-700 mt-1">{{ error }}</p>
              </div>
              <button @click="error = ''" class="ml-4 flex-shrink-0">
                <svg class="h-5 w-5 text-red-400 hover:text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span v-if="loading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Inscription en cours...
            </span>
            <span v-else>Créer mon compte</span>
          </button>
        </form>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Ou continuer avec</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
            </svg>
            <span class="ml-2 text-sm font-medium text-gray-700">Google</span>
          </button>
          <button class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
            </svg>
            <span class="ml-2 text-sm font-medium text-gray-700">GitHub</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import logoImage from '~/assets/logo/car_lab_logo.png'

definePageMeta({
  layout: false
})

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/vehicles')
  }
})

const handleRegister = async () => {
  loading.value = true
  error.value = ''

  // Validation côté client
  if (!form.firstName || !form.lastName || !form.email || !form.password) {
    error.value = 'Veuillez remplir tous les champs'
    loading.value = false
    return
  }

  if (form.password.length < 6) {
    error.value = 'Le mot de passe doit contenir au moins 6 caractères'
    loading.value = false
    return
  }

  try {
    await authStore.register(
      form.email.trim(),
      form.password,
      form.firstName.trim(),
      form.lastName.trim()
    )
    router.push('/vehicles')
  } catch (err) {
    console.error('Erreur complète:', err)
    error.value = err?.data?.statusMessage || err?.data?.message || err?.statusMessage || err?.message || 'Erreur lors de l\'inscription. Veuillez réessayer.'
  } finally {
    loading.value = false
  }
}
</script>
