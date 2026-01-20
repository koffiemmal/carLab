import jwt from 'jsonwebtoken'

export const generateToken = (userId) => {
  const config = useRuntimeConfig()
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '7d' })
}

export const verifyToken = (token) => {
  const config = useRuntimeConfig()
  try {
    return jwt.verify(token, config.jwtSecret)
  } catch (error) {
    return null
  }
}

export const authMiddleware = async (event) => {
  const token = getCookie(event, 'auth-token') || 
                getHeader(event, 'authorization')?.replace('Bearer ', '')
  
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Token d\'authentification manquant'
    })
  }
  
  const decoded = verifyToken(token)
  if (!decoded) {
    throw createError({
      statusCode: 401,
      message: 'Token invalide ou expiré'
    })
  }
  
  const User = (await import('~/server/models/User.js')).default
  const user = await User.findById(decoded.userId).select('-password')
  
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Utilisateur non trouvé'
    })
  }
  
  event.context.user = user
  return user
}

export const adminMiddleware = async (event) => {
  const user = await authMiddleware(event)
  
  if (user.role !== 'admin') {
    throw createError({
      statusCode: 403,
      message: 'Accès refusé. Rôle administrateur requis.'
    })
  }
  
  return user
}
