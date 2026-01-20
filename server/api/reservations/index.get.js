import Reservation from '~/server/models/Reservation.js'
import { authMiddleware, adminMiddleware } from '~/server/utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    const user = await authMiddleware(event)
    const query = getQuery(event)
    const { status, vehicleId, userId } = query

    const filter = {}

    if (user.role !== 'admin') {
      filter.user = user._id
    } else if (userId) {
      filter.user = userId
    }

    if (status) {
      filter.status = status
    }

    if (vehicleId) {
      filter.vehicle = vehicleId
    }

    const reservations = await Reservation.find(filter)
      .populate('user', 'firstName lastName email')
      .populate('vehicle', 'brand model year licensePlate type color image')
      .sort({ startDate: -1 })

    return {
      success: true,
      count: reservations.length,
      reservations
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de la récupération des réservations'
    })
  }
})
