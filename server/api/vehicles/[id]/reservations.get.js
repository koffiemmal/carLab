import Reservation from '~/server/models/Reservation.js'
import { authMiddleware } from '~/server/utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    // Tous les utilisateurs connectés peuvent voir les créneaux réservés d'un véhicule
    await authMiddleware(event)

    const vehicleId = getRouterParam(event, 'id')

    if (!vehicleId) {
      throw createError({
        statusCode: 400,
        message: 'ID du véhicule manquant'
      })
    }

    // On récupère tous les créneaux non annulés pour ce véhicule
    const reservations = await Reservation.find({
      vehicle: vehicleId,
      status: { $in: ['pending', 'confirmed', 'active', 'completed'] }
    }).select('startDate endDate status')

    return {
      success: true,
      reservations
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors du chargement des réservations du véhicule'
    })
  }
})

