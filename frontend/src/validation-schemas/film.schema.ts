import { z } from "zod/v4"

export const filmSchema = z.object({
  title: z.string(),
  episode_id: z.number(),
  opening_crawl: z.string(),
  director: z.string(),
  producer: z.string(),
  release_date: z.string(),
  characters: z.array(z.string()),
  planets: z.array(z.string()),
  starships: z.array(z.string()),
  vehicles: z.array(z.string()),
  species: z.array(z.string()),
  created: z.string(),
  edited: z.string(),
  url: z.url(),
})

export type TFilm = z.infer<typeof filmSchema>
