import type { TFilm } from "../validation-schemas/film.schema"
import type { TPeople } from "../validation-schemas/people.schema"
import type { TPlanet } from "../validation-schemas/planet.shema"
import type { TSpecies } from "../validation-schemas/species.schema"
import type { TStarship } from "../validation-schemas/starship.schema"
import type { TVehicle } from "../validation-schemas/vehicle.schema"

export const getStoreDataByCategory = (
  category: string,
  data: {
    films: TFilm[]
    planets: TPlanet[]
    peoples: TPeople[]
    species: TSpecies[]
    starships: TStarship[]
    vehicles: TVehicle[]
  }
) => {
  switch (category) {
    case "films":
      return data.films || []
    case "planets":
      return data.planets || []
    case "people":
      return data.peoples || []
    case "species":
      return data.species || []
    case "starships":
      return data.starships || []
    case "vehicles":
      return data.vehicles || []
    default:
      return []
  }
}
