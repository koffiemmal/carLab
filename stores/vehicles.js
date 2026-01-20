import { defineStore } from 'pinia'

export const useVehicleStore = defineStore('vehicles', {
  state: () => ({
    vehicles: [],
    currentVehicle: null,
    filters: {
      status: '',
      type: '',
      brand: '',
      search: ''
    },
    loading: false
  }),

  actions: {
    async fetchVehicles(filters = {}) {
      this.loading = true
      try {
        const query = new URLSearchParams()
        
        Object.keys(filters).forEach(key => {
          if (filters[key]) {
            query.append(key, filters[key])
          }
        })

        const response = await $fetch(`/api/vehicles?${query.toString()}`)
        this.vehicles = response.vehicles
        return response.vehicles
      } catch (error) {
        console.error('Erreur lors de la récupération des véhicules:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchAvailableVehicles(startDate, endDate) {
      this.loading = true
      try {
        const response = await $fetch('/api/vehicles/available', {
          query: { startDate, endDate }
        })
        return response.vehicles
      } catch (error) {
        console.error('Erreur lors de la récupération des véhicules disponibles:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchVehicle(id) {
      console.log('🔍 [Vehicle Store] fetchVehicle appelé avec ID:', id)
      try {
        const url = `/api/vehicles/${id}`
        console.log('🔍 [Vehicle Store] URL de l\'API:', url)
        const response = await $fetch(url)
        console.log('✅ [Vehicle Store] Réponse de l\'API:', response)
        this.currentVehicle = response.vehicle
        console.log('✅ [Vehicle Store] Véhicule stocké:', this.currentVehicle)
        return response.vehicle
      } catch (error) {
        console.error('❌ [Vehicle Store] Erreur lors de la récupération du véhicule:', error)
        console.error('❌ [Vehicle Store] Détails de l\'erreur:', {
          message: error.message,
          data: error.data,
          statusCode: error.statusCode,
          statusMessage: error.statusMessage
        })
        throw error
      }
    },

    setFilters(filters) {
      this.filters = { ...this.filters, ...filters }
    },

    resetFilters() {
      this.filters = {
        status: '',
        type: '',
        brand: '',
        search: ''
      }
    }
  }
})
