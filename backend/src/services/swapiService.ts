const BASE_URL = "https://swapi.info/api/"
const RESOURCES = [
  "people",
  "starships",
  "planets",
  "vehicles",
  "species",
  "films",
]

export async function searchAll(query: string) {
  const allResults: any[] = []

  await Promise.all(
    RESOURCES.map(async (resource) => {
      try {
        const response = await fetch(`${BASE_URL}${resource}/?search=${query}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const json = await response.json()
        const data = json.map((item: any) => ({
          type: resource,
          name: item.name || item.title,
          ...item,
        }))

        allResults.push(...data)
      } catch (err: any) {
        console.warn(`Failed to fetch ${resource}:`, err.message)
      }
    })
  )

  console.log("🚀 ~ allResults:", allResults)
  return allResults
}
