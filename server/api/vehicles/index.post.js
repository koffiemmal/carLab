import Vehicle from '~/server/models/Vehicle.js'
import { adminMiddleware } from '~/server/utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    await adminMiddleware(event)

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
      description
    } = body

    if (!brand || !model || !year || !licensePlate || !type || !seats) {
      throw createError({
        statusCode: 400,
        message: 'Les champs obligatoires sont: marque, modèle, année, plaque, type et nombre de places'
      })
    }

    const existingVehicle = await Vehicle.findOne({ licensePlate })
    if (existingVehicle) {
      throw createError({
        statusCode: 400,
        message: 'Un véhicule avec cette plaque existe déjà'
      })
    }

    const vehicle = new Vehicle({
      brand,
      model,
      year,
      licensePlate,
      color: color || 'Non spécifié',
      type,
      seats,
      mileage: mileage || 0,
      image: image || '',
      description: description || ''
    })

    await vehicle.save()

    return {
      success: true,
      vehicle
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de la création du véhicule'
    })
  }
})
