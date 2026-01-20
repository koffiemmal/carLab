import User from '~/server/models/User.js'

export default defineEventHandler(async (event) => {
  try {
    const adminEmail = 'admin@carlab.com'
    const adminPassword = '12345678'

    // Vérifier si l'admin existe déjà
    let admin = await User.findOne({ email: adminEmail })
    
    if (admin) {
      // Mettre à jour le mot de passe et le rôle
      admin.password = adminPassword
      admin.role = 'admin'
      admin.firstName = 'Admin'
      admin.lastName = 'System'
      await admin.save()
      
      return {
        success: true,
        message: 'Compte administrateur mis à jour avec succès',
        user: {
          id: admin._id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role
        }
      }
    } else {
      // Créer le nouvel admin
      admin = new User({
        email: adminEmail,
        password: adminPassword,
        firstName: 'Admin',
        lastName: 'System',
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
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Erreur lors de la création/mise à jour du compte administrateur'
    })
  }
})
