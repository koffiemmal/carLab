import Reservation from '~/server/models/Reservation.js'
import { authMiddleware } from '~/server/utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    const user = await authMiddleware(event)
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

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
        message: 'Vous ne pouvez modifier que vos propres réservations'
      })
    }

    if (reservation.status === 'completed' || reservation.status === 'cancelled') {
      throw createError({
        statusCode: 400,
        message: 'Impossible de modifier une réservation terminée ou annulée'
      })
    }

    const {
      startDate,
      endDate,
      startTime,
      endTime,
      pickupLocation,
      dropoffLocation,
      purpose,
      notes,
      status
    } = body

    if (startDate) reservation.startDate = new Date(startDate)
    if (endDate) reservation.endDate = new Date(endDate)
    if (startTime) reservation.startTime = startTime
    if (endTime) reservation.endTime = endTime
    if (pickupLocation !== undefined) reservation.pickupLocation = pickupLocation
    if (dropoffLocation !== undefined) reservation.dropoffLocation = dropoffLocation
    if (purpose !== undefined) reservation.purpose = purpose
    if (notes !== undefined) reservation.notes = notes
    if (status && user.role === 'admin') reservation.status = status

    if (reservation.startDate >= reservation.endDate) {
      throw createError({
        statusCode: 400,
        message: 'La date de début doit être antérieure à la date de fin'
      })
    }

    if (startDate || endDate) {
      const hasOverlap = await reservation.checkOverlap()
      if (hasOverlap) {
        throw createError({
          statusCode: 400,
          message: 'Ce véhicule est déjà réservé pour cette période'
        })
      }
    }

    await reservation.save()

    const updatedReservation = await Reservation.findById(reservation._id)
      .populate('user', 'firstName lastName email')
      .populate('vehicle', 'brand model year licensePlate type color image')

    return {
      success: true,
      reservation: updatedReservation
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de la modification de la réservation'
    })
  }
})
