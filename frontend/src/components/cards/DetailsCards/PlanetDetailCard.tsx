import { Link, useParams } from "react-router"
import { useItemFromCache } from "../../../hooks/useSearch"

export default function PlanetDetailsCard() {
  const { id } = useParams()
  const {
    data: planet,
    isFetching,
    error,
    isError,
  } = useItemFromCache("planets", id!)
  return (
    <div className="flex flex-col gap-6 min-h-screen max-w-2xl w-full">
      <p className="font-bold text-lg">Details</p>
      {isFetching && <span>Loading...</span>}
      {isError && <span>Error: {error.message}</span>}
      <div className="flex flex-col p-4 gap-2 rounded-2xl bg-emerald-200 justify-center">
        <p className="font-bold text-slate-700 text-2xl">{planet?.name}</p>
        <p className="font-bold text-slate-700">climate: {planet?.climate}</p>
        <p className="text-slate-700 text-balance">
          <span className="font-bold">Diameter</span>: {planet?.diameter} km
        </p>
        <p className="text-slate-700 text-balance">
          <span className="font-bold">Gravity</span>: {planet?.gravity}
        </p>
        <p className="text-slate-700 text-balance">
          <span className="font-bold">Population</span>: {planet?.population}
        </p>
        <p className="text-slate-700 text-balance">
          <span className="font-bold">Orbital period</span>:{" "}
          {planet?.orbital_period} years
        </p>
        <Link to="/search?q=planets" className="p-2 bg-blue-600 rounded-2xl">
          Back
        </Link>
      </div>
    </div>
  )
}
