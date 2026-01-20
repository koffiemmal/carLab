import User from '~/server/models/User.js'
import { generateToken } from '~/server/utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password, firstName, lastName } = body

    console.log('Tentative d\'inscription:', { email, firstName, lastName })

    if (!email || !password || !firstName || !lastName) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Tous les champs sont requis'
      })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Cet email est déjà utilisé'
      })
    }

    const user = new User({
      email,
      password,
      firstName,
      lastName
    })

    await user.save()
    console.log('Utilisateur créé avec succès:', user._id)

    const token = generateToken(user._id)

    setCookie(event, 'auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7
    })

    return {
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    }
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    
    if (error.statusCode) {
      throw createError({
        statusCode: error.statusCode,
        statusMessage: error.statusMessage || error.message
      })
    }

    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Cet email est déjà utilisé'
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Erreur lors de l\'inscription'
    })
  }
})
