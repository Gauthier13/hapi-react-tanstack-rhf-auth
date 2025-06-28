import { useQuery } from "@tanstack/react-query"

export function useSearch(category: string) {
  const {
    isError,
    data: result,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["search", category],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/search?q=${category}`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${btoa(`Luke:DadSucks`)}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`)
      }

      return response.json()
    },
    enabled: !!category && category.length >= 2,
    staleTime: 2 * 60 * 1000,
  })

  return { isError, data: result, error, isFetching }
}
