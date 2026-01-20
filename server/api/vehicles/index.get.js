import Vehicle from '~/server/models/Vehicle.js'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { status, type, brand, search, available } = query

    const filter = {}

    if (status) {
      filter.status = status
    }

    if (type) {
      filter.type = type
    }

    if (brand) {
      filter.brand = { $regex: brand, $options: 'i' }
    }

    if (search) {
      filter.$or = [
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
        { licensePlate: { $regex: search, $options: 'i' } }
      ]
    }

    if (available === 'true') {
      filter.status = 'available'
    }

    const vehicles = await Vehicle.find(filter).sort({ createdAt: -1 })

    return {
      success: true,
      count: vehicles.length,
      vehicles
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Erreur lors de la récupération des véhicules'
    })
  }
})
