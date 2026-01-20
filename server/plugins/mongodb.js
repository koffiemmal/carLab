import { connectDB } from '~/server/utils/db.js'

export default defineNitroPlugin(async () => {
  await connectDB()
})
