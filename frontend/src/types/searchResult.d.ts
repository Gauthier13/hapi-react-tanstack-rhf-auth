export type TSearchResult =
  | {
      success: boolean
      category: TCategory
      data: any
    }
  | {
      success: boolean
      code: number
      message: string
    }

const CATEGORIES = [
  "people",
  "starships",
  "planets",
  "vehicles",
  "species",
  "films",
] as const

export type TCategory = (typeof CATEGORIES)[number]
