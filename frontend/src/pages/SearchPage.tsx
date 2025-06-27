import { useQuery } from "@tanstack/react-query"

export default function SearchPage() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/search", {
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
    },
  })
  console.log("🚀 ~ data:", data)

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return <div>search page</div>
}
