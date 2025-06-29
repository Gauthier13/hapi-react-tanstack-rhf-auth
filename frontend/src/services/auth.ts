import { useMutation } from "@tanstack/react-query"
import type { LoginResponse } from "../types/auth"

const config = {
  API_URL:
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://fastory-backend-production.up.railway.app",
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string
      password: string
    }) => {
      const response = await fetch(`${config.API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (response.status === 401) {
        throw new Error("Invalid credentials")
      }

      if (!response.ok) {
        throw new Error("Login failed")
      }

      return response.json() as Promise<LoginResponse>
    },
    onSuccess: (data) => {
      localStorage.setItem("auth_token", data.token)
    },
  })
}
