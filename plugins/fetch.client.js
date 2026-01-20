export default defineNuxtPlugin(() => {
  if (!process.client) return
  
  const authStore = useAuthStore()
  
  const originalFetch = globalThis.$fetch
  
  globalThis.$fetch = async (url, options = {}) => {
    const token = authStore.token || localStorage.getItem('auth-token')
    
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`
      }
    }
    
    return originalFetch(url, options)
  }
})
