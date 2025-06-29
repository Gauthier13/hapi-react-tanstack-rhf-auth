import { createContext, useState, useEffect } from "react"
import { useLogin, isAuthenticated, logout } from "../services/auth"
import type { LoginResponse } from "../types/auth"

interface AuthContextType {
  user: {
    id: number
    username: string
  } | null
  login: (username: string, password: string) => Promise<LoginResponse>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
  error: Error | null
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: number; username: string } | null>(
    null
  )

  const loginMutation = useLogin()

  useEffect(() => {
    if (isAuthenticated()) {
      const userData = localStorage.getItem("user_name")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }
  }, [])

  const login = async (username: string, password: string) => {
    const result = await loginMutation.mutateAsync({ username, password })
    setUser(result.user)
    localStorage.setItem("user_name", JSON.stringify(result.user))
    return result
  }

  const handleLogout = () => {
    logout()
    localStorage.removeItem("user_name")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading: loginMutation.isPending,
        error: loginMutation.error,
        login,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
