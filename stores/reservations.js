import { defineStore } from 'pinia'

export const useReservationStore = defineStore('reservations', {
  state: () => ({
    reservations: [],
    currentReservation: null,
    loading: false
  }),

  actions: {
    async fetchReservations(filters = {}) {
      this.loading = true
      try {
        const query = new URLSearchParams()
        
        Object.keys(filters).forEach(key => {
          if (filters[key]) {
            query.append(key, filters[key])
          }
        })

        const response = await $fetch(`/api/reservations?${query.toString()}`)
        this.reservations = response.reservations
        return response.reservations
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchReservation(id) {
      try {
        const response = await $fetch(`/api/reservations/${id}`)
        this.currentReservation = response.reservation
        return response.reservation
      } catch (error) {
        console.error('Erreur lors de la récupération de la réservation:', error)
        throw error
      }
    },

    async createReservation(data) {
      this.loading = true
      try {
        const response = await $fetch('/api/reservations', {
          method: 'POST',
          body: data
        })
        this.reservations.unshift(response.reservation)
        return response.reservation
      } catch (error) {
        console.error('Erreur lors de la création de la réservation:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateReservation(id, data) {
      this.loading = true
      try {
        const response = await $fetch(`/api/reservations/${id}`, {
          method: 'PATCH',
          body: data
        })
        
        const index = this.reservations.findIndex(r => r._id === id)
        if (index !== -1) {
          this.reservations[index] = response.reservation
        }
        
        return response.reservation
      } catch (error) {
        console.error('Erreur lors de la modification de la réservation:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async cancelReservation(id) {
      this.loading = true
      try {
        const response = await $fetch(`/api/reservations/${id}/cancel`, {
          method: 'POST'
        })
        
        const index = this.reservations.findIndex(r => r._id === id)
        if (index !== -1) {
          this.reservations[index] = response.reservation
        }
        
        return response.reservation
      } catch (error) {
        console.error('Erreur lors de l\'annulation de la réservation:', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
