import { useQuery } from "@tanstack/react-query"

const fetchCategoryData = async (category: string) => {
  if (!category) {
    throw new Error("Category is required")
  }

  const response = await fetch(`http://localhost:3000/search?q=${category}`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${btoa(`Luke:DadSucks`)}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`)
  }

  return response.json()
}

export function useSearch(category: string) {
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

export const useItemFromCache = (category: string, itemId: string) => {
  return useQuery({
    queryKey: ["search", category],
    queryFn: () => fetchCategoryData(category),
    enabled: !!category,
    select: (result) => {
      return result.data.find((item) => item.id === itemId) || null
    },
  })
}
