import { defineStore } from 'pinia'
import { ref } from 'vue'

const TIMEOUT_MS = 30 * 60 * 1000 // 30분 
const ACTIVITY_EVENTS = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart']

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  let timer: ReturnType<typeof setTimeout> | null = null

  const logout = () => {
    isLoggedIn.value = false
    stopActivityTracking()
  }

  const resetTimer = () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      logout()
    }, TIMEOUT_MS)
  }

  const startActivityTracking = () => {
    ACTIVITY_EVENTS.forEach(event => window.addEventListener(event, resetTimer))
    resetTimer()
  }

  const stopActivityTracking = () => {
    ACTIVITY_EVENTS.forEach(event => window.removeEventListener(event, resetTimer))
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    alert('session expired due to inactivity. Please log in again.')
  }

  const login = (username: string, password: string): boolean => {
    if (username === '1' && password === '1') {
      isLoggedIn.value = true
      startActivityTracking()
      return true
    }
    return false
  }

  return { isLoggedIn, login, logout }
})
