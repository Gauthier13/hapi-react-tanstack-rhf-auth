import { useSelector } from "react-redux"
import type { RootState } from "../store/store"

export const useStoreData = () => {
  const films = useSelector((state: RootState) => state.films)
  const planets = useSelector((state: RootState) => state.planets)
  const peoples = useSelector((state: RootState) => state.peoples)
  const species = useSelector((state: RootState) => state.species)
  const starships = useSelector((state: RootState) => state.starships)
  const vehicles = useSelector((state: RootState) => state.vehicles)

  return {
    films,
    planets,
    peoples,
    species,
    starships,
    vehicles,
  }
}
