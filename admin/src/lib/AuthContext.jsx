import { createContext, useContext, useEffect, useState } from 'react'
import { api } from './api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(null) // null = loading

  useEffect(() => {
    api
      .get('/api/me')
      .then((d) => setAuthenticated(d.authenticated))
      .catch(() => setAuthenticated(false))
  }, [])

  async function login(password) {
    await api.post('/api/login', { password })
    setAuthenticated(true)
  }

  async function logout() {
    await api.post('/api/logout')
    setAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
