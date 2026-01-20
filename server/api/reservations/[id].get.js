import Reservation from '~/server/models/Reservation.js'
import { authMiddleware } from '~/server/utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    const user = await authMiddleware(event)
    const id = getRouterParam(event, 'id')

    const reservation = await Reservation.findById(id)
      .populate('user', 'firstName lastName email')
      .populate('vehicle', 'brand model year licensePlate type color image seats')

    if (!reservation) {
      throw createError({
        statusCode: 404,
        message: 'Réservation non trouvée'
      })
    }

    if (user.role !== 'admin' && reservation.user._id.toString() !== user._id.toString()) {
      throw createError({
        statusCode: 403,
        message: 'Accès refusé'
      })
    }

    return {
      success: true,
      reservation
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de la récupération de la réservation'
    })
  }
})
