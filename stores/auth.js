import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  hydrate(state) {
    if (process.client) {
      const storedToken = localStorage.getItem('auth-token')
      const storedUser = localStorage.getItem('auth-user')
      
      if (storedToken) {
        state.token = storedToken
      }
      
      if (storedUser) {
        try {
          state.user = JSON.parse(storedUser)
          state.isAuthenticated = true
        } catch (e) {
          console.error('Erreur lors de la restauration de l\'utilisateur:', e)
        }
      }
    }
  },

  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
    fullName: (state) => {
      if (!state.user) return ''
      return `${state.user.firstName} ${state.user.lastName}`
    }
  },

  actions: {
    async login(email, password) {
      try {
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { email, password }
        })

        this.user = response.user
        this.token = response.token
        this.isAuthenticated = true

        if (process.client) {
          localStorage.setItem('auth-token', response.token)
          localStorage.setItem('auth-user', JSON.stringify(response.user))
        }

        return { success: true, user: response.user }
      } catch (error) {
        throw error
      }
    },

    async register(email, password, firstName, lastName) {
      try {
        const response = await $fetch('/api/auth/register', {
          method: 'POST',
          body: { email, password, firstName, lastName }
        })

        if (!response || !response.user) {
          throw new Error('Réponse invalide du serveur')
        }

        this.user = response.user
        this.token = response.token
        this.isAuthenticated = true

        if (process.client) {
          localStorage.setItem('auth-token', response.token)
          localStorage.setItem('auth-user', JSON.stringify(response.user))
        }

        return { success: true, user: response.user }
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error)
        const errorMessage = error?.data?.statusMessage || error?.data?.message || error?.statusMessage || error?.message || 'Erreur lors de l\'inscription'
        const customError = new Error(errorMessage)
        customError.data = error?.data || { message: errorMessage }
        throw customError
      }
    },

    async logout() {
      try {
        await $fetch('/api/auth/logout', { method: 'POST' })
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error)
      } finally {
        this.user = null
        this.token = null
        this.isAuthenticated = false
        
        if (process.client) {
          localStorage.removeItem('auth-token')
          localStorage.removeItem('auth-user')
        }
        
        navigateTo('/login')
      }
    },

    async fetchUser() {
      try {
        const response = await $fetch('/api/auth/me')
        this.user = response.user
        this.isAuthenticated = true
        
        if (process.client) {
          localStorage.setItem('auth-user', JSON.stringify(response.user))
        }
        
        return response.user
      } catch (error) {
        this.user = null
        this.isAuthenticated = false
        
        if (process.client) {
          localStorage.removeItem('auth-token')
          localStorage.removeItem('auth-user')
        }
        
        return null
      }
    },

    initAuth() {
      if (process.client) {
        const storedToken = localStorage.getItem('auth-token')
        const storedUser = localStorage.getItem('auth-user')
        
        if (storedToken && storedUser) {
          try {
            this.token = storedToken
            this.user = JSON.parse(storedUser)
            this.isAuthenticated = true
          } catch (e) {
            console.error('Erreur lors de la restauration de l\'authentification:', e)
            localStorage.removeItem('auth-token')
            localStorage.removeItem('auth-user')
          }
        }
      }
    }
  }
})
