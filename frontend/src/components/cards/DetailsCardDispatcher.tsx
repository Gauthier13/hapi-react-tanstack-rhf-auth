import { Link, useParams } from "react-router"
import FilmDetailsCard from "./DetailsCards/FilmDetailsCard"
import PeopleDetailCard from "./DetailsCards/PeopleDetailCard"
import PlanetDetailsCard from "./DetailsCards/PlanetDetailCard"
import SpecieDetailCard from "./DetailsCards/SpecieDetailCard"
import StarshipDetailCard from "./DetailsCards/StarshipDetailCard"
import VehicleDetailCard from "./DetailsCards/VehicleDetailCard"

function DetailsCardDispatcher() {
  const { category } = useParams()

  const renderCard = () => {
    switch (category) {
      case "films":
        return <FilmDetailsCard />
      case "planets":
        return <PlanetDetailsCard />
      case "peoples":
        return <PeopleDetailCard />
      case "species":
        return <SpecieDetailCard />
      case "starships":
        return <StarshipDetailCard />
      case "vehicles":
        return <VehicleDetailCard />
      default:
        return (
          <div className="flex flex-col gap-2 w-full">
            <p className="font-bold">Category not found</p>
            <Link to={"/search"} className="p-2 rounded-2xl bg-blue-400">
              Back to search
            </Link>
          </div>
        )
    }
  }

  return (
    <div className="flex w-full justify-center items-center min-h-screen">
      {renderCard()}
    </div>
  )
}

export default DetailsCardDispatcher
