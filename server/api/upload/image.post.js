import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { adminMiddleware } from '~/server/utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    await adminMiddleware(event)

    const formData = await readMultipartFormData(event)
    
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'Aucun fichier fourni'
      })
    }

    const file = formData.find(item => item.name === 'image')
    
    if (!file) {
      throw createError({
        statusCode: 400,
        message: 'Aucun fichier image trouvé'
      })
    }

    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      throw createError({
        statusCode: 400,
        message: 'Type de fichier non autorisé. Formats acceptés: JPEG, PNG, GIF, WebP'
      })
    }

    // Vérifier la taille (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.data.length > maxSize) {
      throw createError({
        statusCode: 400,
        message: 'Fichier trop volumineux. Taille maximale: 5MB'
      })
    }

    // Créer le dossier uploads s'il n'existe pas
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'vehicles')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Générer un nom de fichier unique
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.filename?.split('.').pop() || 'jpg'
    const filename = `${timestamp}-${randomString}.${extension}`
    const filepath = join(uploadsDir, filename)

    // Sauvegarder le fichier
    await writeFile(filepath, file.data)

    // Retourner l'URL de l'image via l'API
    const imageUrl = `/api/uploads/vehicles/${filename}`

    return {
      success: true,
      url: imageUrl,
      filename: filename
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de l\'upload de l\'image'
    })
  }
})
