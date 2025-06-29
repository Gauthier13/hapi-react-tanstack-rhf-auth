import CardFilms from "./CardFilms"
import CardPeople from "./CardPeople"
import CardPlanets from "./CardPlanets"
import CardSpecies from "./CardSpecies"
import CardStarships from "./CardStarships"
import CardVehicles from "./CardVehicles"

type CardsProps = {
  category: string
  data: unknown
}

const cardMap: Record<string, React.ComponentType<{ data: unknown }>> = {
  films: CardFilms,
  planets: CardPlanets,
  starships: CardStarships,
  people: CardPeople,
  species: CardSpecies,
  vehicles: CardVehicles,
}

export const Cards: React.FC<CardsProps> = ({ category, data }) => {
  const CardComponent = cardMap[category]
  return <CardComponent data={data} />
}
