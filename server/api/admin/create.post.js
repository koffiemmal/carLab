import User from '~/server/models/User.js'

export default defineEventHandler(async (event) => {
  try {
    const { email, password, firstName, lastName } = await readBody(event)

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'Un utilisateur avec cet email existe déjà'
      })
    }

    // Créer l'utilisateur admin
    const admin = new User({
      email: email.toLowerCase(),
      password,
      firstName,
      lastName,
      role: 'admin'
    })

    await admin.save()

    return {
      success: true,
      message: 'Compte administrateur créé avec succès',
      user: {
        id: admin._id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        role: admin.role
      }
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de la création du compte administrateur'
    })
  }
})
