import Reservation from '~/server/models/Reservation.js'
import { authMiddleware } from '~/server/utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    const user = await authMiddleware(event)
    const id = getRouterParam(event, 'id')

    const reservation = await Reservation.findById(id)

    if (!reservation) {
      throw createError({
        statusCode: 404,
        message: 'Réservation non trouvée'
      })
    }

    if (user.role !== 'admin' && reservation.user.toString() !== user._id.toString()) {
      throw createError({
        statusCode: 403,
        message: 'Vous ne pouvez annuler que vos propres réservations'
      })
    }

    if (reservation.status === 'cancelled') {
      throw createError({
        statusCode: 400,
        message: 'Cette réservation est déjà annulée'
      })
    }

    if (reservation.status === 'completed') {
      throw createError({
        statusCode: 400,
        message: 'Impossible d\'annuler une réservation terminée'
      })
    }

    reservation.status = 'cancelled'
    await reservation.save()

    const updatedReservation = await Reservation.findById(reservation._id)
      .populate('user', 'firstName lastName email')
      .populate('vehicle', 'brand model year licensePlate type color image')

    return {
      success: true,
      message: 'Réservation annulée avec succès',
      reservation: updatedReservation
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de l\'annulation de la réservation'
    })
  }
})
