import { useQuery } from "@tanstack/react-query"
import type { TCategory } from "../types/searchResult"

const fetchCategoryData = async (category: TCategory | string) => {
  if (!category) {
    throw new Error("Category is required")
  }

  const config = {
    API_URL:
      window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://fastory-backend-production.up.railway.app",
  }

  const userToken = localStorage.getItem("auth_token")

  const response = await fetch(`${config.API_URL}/search?q=${category}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  })

  if (response.status === 401) {
    const data = await response.json()

    if (data.redirectTo) {
      window.location.href = data.redirectTo
      return
    }

    throw new Error(data.error)
  }
  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`)
  }

  return response.json()
}

export function useSearch(category: TCategory | string) {
  const {
    isError,
    data: result,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["search", category],
    queryFn: async () => {
      return fetchCategoryData(category)
    },
    enabled: !!category && category.length >= 2,
  })

  return { isError, data: result, error, isFetching }
}

export const useItemFromCache = (category: TCategory, itemId: string) => {
  return useQuery({
    queryKey: ["search", category],
    queryFn: () => fetchCategoryData(category),
    enabled: !!category,
    select: (result) => {
      return result.data.find((item) => item.id === itemId) || null
    },
  })
}
