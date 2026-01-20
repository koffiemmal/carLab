import Vehicle from '~/server/models/Vehicle.js'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    const vehicle = await Vehicle.findById(id)

    if (!vehicle) {
      throw createError({
        statusCode: 404,
        message: 'Véhicule non trouvé'
      })
    }

    return {
      success: true,
      vehicle
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de la récupération du véhicule'
    })
  }
})
