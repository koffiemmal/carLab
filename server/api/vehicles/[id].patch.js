import Vehicle from '~/server/models/Vehicle.js'
import { adminMiddleware } from '~/server/utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    await adminMiddleware(event)

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    const {
      brand,
      model,
      year,
      licensePlate,
      color,
      type,
      seats,
      mileage,
      image,
      description,
      status
    } = body

    const vehicle = await Vehicle.findById(id)

    if (!vehicle) {
      throw createError({
        statusCode: 404,
        message: 'Véhicule non trouvé'
      })
    }

    if (licensePlate && licensePlate !== vehicle.licensePlate) {
      const existingVehicle = await Vehicle.findOne({ licensePlate })
      if (existingVehicle) {
        throw createError({
          statusCode: 400,
          message: 'Un véhicule avec cette plaque existe déjà'
        })
      }
    }

    if (brand) vehicle.brand = brand
    if (model) vehicle.model = model
    if (year) vehicle.year = year
    if (licensePlate) vehicle.licensePlate = licensePlate
    if (color !== undefined) vehicle.color = color
    if (type) vehicle.type = type
    if (seats) vehicle.seats = seats
    if (mileage !== undefined) vehicle.mileage = mileage
    if (image !== undefined) vehicle.image = image
    if (description !== undefined) vehicle.description = description
    if (status) vehicle.status = status

    await vehicle.save()

    return {
      success: true,
      vehicle
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de la mise à jour du véhicule'
    })
  }
})
