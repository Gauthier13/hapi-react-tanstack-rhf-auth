import { z } from "zod/v4"

export const speciesSchema = z.object({
  name: z.string(),
  classification: z.string(),
  designation: z.string(),
  average_height: z.string(),
  skin_colors: z.string(),
  hair_colors: z.string(),
  eye_colors: z.string(),
  average_lifespan: z.string(),
  homeworld: z.string(),
  language: z.string(),
  people: z.array(z.string()),
  films: z.array(z.string()),
  created: z.string(),
  edited: z.string(),
  url: z.url(),
  id: z.uuidv4(),
})

export type TSpecies = z.infer<typeof speciesSchema>
