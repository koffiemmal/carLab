import Vehicle from '~/server/models/Vehicle.js'
import { adminMiddleware } from '~/server/utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    await adminMiddleware(event)
    
    const id = getRouterParam(event, 'id')

    const vehicle = await Vehicle.findByIdAndDelete(id)

    if (!vehicle) {
      throw createError({
        statusCode: 404,
        message: 'Véhicule non trouvé'
      })
    }

    return {
      success: true,
      message: 'Véhicule supprimé avec succès'
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de la suppression du véhicule'
    })
  }
})
