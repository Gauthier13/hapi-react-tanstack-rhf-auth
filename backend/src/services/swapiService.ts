import { categorySchema, TCategory } from "../validation-schemas/categories"
import { v4 as uuidv4 } from "uuid"

const BASE_URL = "https://swapi.info/api/"

export async function searchAll(
  q: string
): Promise<
  | { success: boolean; category: TCategory; data: any }
  | { success: boolean; code: number; message: string }
> {
  try {
    const { error, value } = categorySchema.validate(q)

    if (error) {
      return {
        success: false,
        message: error.message,
        code: 400,
      }
    }

    const response = await fetch(`${BASE_URL}/${value}`)

    const data = await response.json()

    const dataWithIds = data.map((d) => {
      return { ...d, id: uuidv4() }
    })

    return { success: true, category: value, data: dataWithIds }
  } catch (error) {
    console.error("🚀 ~ error:", error)

    return {
      success: false,
      code: 500,
      message: error.message,
    }
  }
}
