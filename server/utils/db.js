import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const config = useRuntimeConfig()
    await mongoose.connect(config.mongoUri)
    console.log('✅ MongoDB connecté avec succès')
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error)
    throw error
  }
}
