import Vehicle from '~/server/models/Vehicle.js'
import Reservation from '~/server/models/Reservation.js'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { startDate, endDate } = query

    if (!startDate || !endDate) {
      throw createError({
        statusCode: 400,
        message: 'Les dates de début et de fin sont requises'
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

    const conflictingReservations = await Reservation.find({
      status: { $in: ['pending', 'confirmed', 'active'] },
      $or: [
        {
          startDate: { $lte: start },
          endDate: { $gte: start }
        },
        {
          startDate: { $lte: end },
          endDate: { $gte: end }
        },
        {
          startDate: { $gte: start },
          endDate: { $lte: end }
        }
      ]
    }).select('vehicle')

    const conflictingVehicleIds = conflictingReservations.map(r => r.vehicle)

    const availableVehicles = await Vehicle.find({
      status: 'available',
      _id: { $nin: conflictingVehicleIds }
    }).sort({ brand: 1, model: 1 })

    return {
      success: true,
      count: availableVehicles.length,
      vehicles: availableVehicles
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de la récupération des véhicules disponibles'
    })
  }
})
