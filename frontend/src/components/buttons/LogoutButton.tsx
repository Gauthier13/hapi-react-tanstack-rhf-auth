import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function LogoutButton() {
  const { logout } = useContext(AuthContext)
  return (
    <button
      className="p-4 rounded-2xl bg-red-600 font-bold cursor-pointer"
      onClick={logout}
    >
      Log out
    </button>
  )
}
