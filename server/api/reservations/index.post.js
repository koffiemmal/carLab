import Reservation from '~/server/models/Reservation.js'
import Vehicle from '~/server/models/Vehicle.js'
import { authMiddleware } from '~/server/utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    const user = await authMiddleware(event)
    const body = await readBody(event)
    const {
      vehicle,
      startDate,
      endDate,
      startTime,
      endTime,
      pickupLocation,
      dropoffLocation,
      purpose,
      notes
    } = body

    if (!vehicle || !startDate || !endDate || !startTime || !endTime) {
      throw createError({
        statusCode: 400,
        message: 'Véhicule, dates et heures sont requis'
      })
    }

    const vehicleDoc = await Vehicle.findById(vehicle)
    if (!vehicleDoc) {
      throw createError({
        statusCode: 404,
        message: 'Véhicule non trouvé'
      })
    }

    if (vehicleDoc.status !== 'available') {
      throw createError({
        statusCode: 400,
        message: 'Ce véhicule n\'est pas disponible'
      })
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start >= end) {
      throw createError({
        statusCode: 400,
        message: 'La date de début doit être antérieure à la date de fin'
      })
    }

    const now = new Date()
    now.setHours(0, 0, 0, 0)
    if (start < now) {
      throw createError({
        statusCode: 400,
        message: 'La date de début ne peut pas être dans le passé'
      })
    }

    const reservation = new Reservation({
      user: user._id,
      vehicle,
      startDate: start,
      endDate: end,
      startTime,
      endTime,
      pickupLocation: pickupLocation || '',
      dropoffLocation: dropoffLocation || '',
      purpose: purpose || '',
      notes: notes || '',
      status: 'pending'
    })

    const hasOverlap = await reservation.checkOverlap()
    if (hasOverlap) {
      throw createError({
        statusCode: 400,
        message: 'Ce véhicule est déjà réservé pour cette période'
      })
    }

    await reservation.save()

    const populatedReservation = await Reservation.findById(reservation._id)
      .populate('user', 'firstName lastName email')
      .populate('vehicle', 'brand model year licensePlate type color image')

    return {
      success: true,
      reservation: populatedReservation
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de la création de la réservation'
    })
  }
})
