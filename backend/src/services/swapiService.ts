import { TCategories, TCategory } from "../types/swapi"

const BASE_URL = "https://swapi.info/api/"

const CATEGORIES: TCategories = [
  "people",
  "starships",
  "planets",
  "vehicles",
  "species",
  "films",
]

export async function searchAll() {
  const data = await Promise.all(CATEGORIES.map((c) => fetchCategoryData(c)))
  console.log("🚀 ~  data:", data)

  return data
}

const fetchCategoryData = async (
  category: TCategory
): Promise<{ success: boolean; category: TCategory; data: any } | null> => {
  try {
    const response = await fetch(`${BASE_URL}/${category}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${category}: ${response.status}`)
    }

    const data = await response.json()

    return { success: true, category: category, data }
  } catch (error) {
    console.error(`Error fetching ${category}:`, error)
    return null
  }
}
