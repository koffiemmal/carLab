import { authMiddleware } from '~/server/utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    const user = await authMiddleware(event)
    
    return {
      success: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 401,
      message: error.message || 'Non authentifié'
    })
  }
})
