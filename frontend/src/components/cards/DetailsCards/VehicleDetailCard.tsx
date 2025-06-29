import { Link, useParams } from "react-router"
import { useItemFromCache } from "../../../hooks/useSearch"

export default function VehiculeDetailCard() {
  const { id } = useParams()
  const {
    data: vehicle,
    isFetching,
    error,
    isError,
  } = useItemFromCache("vehicles", id!)
  return (
    <div className="flex flex-col gap-6 max-w-2xl w-full">
      <p className="font-bold text-lg">Details</p>
      {isFetching && <span>Loading...</span>}
      {isError && <span>Error: {error.message}</span>}
      <div className="flex flex-col p-4 gap-2 rounded-2xl bg-lime-200 justify-center">
        <p className="font-bold text-slate-700 text-2xl">{vehicle?.name}</p>
        <p className="font-bold text-slate-700">
          Manufacturer: {vehicle?.manufacturer}
        </p>
        <p className="text-slate-700">
          <span className="font-bold">Model</span>: {vehicle?.model}
        </p>
        <p className="text-slate-700">
          <span className="font-bold">Cargo capacity</span>:{" "}
          {vehicle?.cargo_capacity} L
        </p>
        <p className="text-slate-700">
          <span className="font-bold">Consumables</span>: {vehicle?.consumables}
        </p>
        <p className="text-slate-700">
          <span className="font-bold">Length</span>: {vehicle?.length} m
        </p>
      </div>
      <Link to="/search?q=vehicles" className="p-2 bg-blue-600 rounded-2xl">
        Back
      </Link>
    </div>
  )
}
