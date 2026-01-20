import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export default defineEventHandler(async (event) => {
  try {
    const filename = getRouterParam(event, 'filename')
    
    if (!filename) {
      throw createError({
        statusCode: 404,
        message: 'Fichier non trouvé'
      })
    }

    // Construire le chemin complet du fichier
    const filePath = join(process.cwd(), 'public', 'uploads', 'vehicles', filename)

    // Vérifier que le fichier existe
    if (!existsSync(filePath)) {
      throw createError({
        statusCode: 404,
        message: 'Fichier non trouvé'
      })
    }

    // Lire le fichier
    const fileBuffer = await readFile(filePath)

    // Déterminer le type MIME basé sur l'extension
    const ext = filename.split('.').pop()?.toLowerCase()
    const mimeTypes = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'svg': 'image/svg+xml'
    }
    const contentType = mimeTypes[ext] || 'application/octet-stream'

    // Retourner le fichier avec les bons headers
    setHeader(event, 'Content-Type', contentType)
    setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
    
    return fileBuffer
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de la récupération du fichier'
    })
  }
})
