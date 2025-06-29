import { Navigate, Outlet } from "react-router"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
