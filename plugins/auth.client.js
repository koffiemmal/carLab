export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  
  if (process.client) {
    authStore.initAuth()
    
    if (authStore.isAuthenticated) {
      await authStore.fetchUser()
    }
  }
})
