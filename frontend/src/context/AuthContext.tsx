import { createContext, useState, useEffect } from "react"
import { useLogin } from "../services/auth"
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
  const [isLoading, setIsLoading] = useState(true)

  const loginMutation = useLogin()

  useEffect(() => {
    const bootstrap = () => {
      const userData = localStorage.getItem("user_name")
      if (userData) {
        setUser(JSON.parse(userData))
      }

      setIsLoading(false)
    }

    bootstrap()
  }, [])

  const login = async (username: string, password: string) => {
    const result = await loginMutation.mutateAsync({ username, password })
    setUser(result.user)
    localStorage.setItem("user_name", JSON.stringify(result.user))
    return result
  }

  const handleLogout = () => {
    localStorage.removeItem("user_name")
    localStorage.removeItem("auth_token")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error: loginMutation.error,
        login,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
