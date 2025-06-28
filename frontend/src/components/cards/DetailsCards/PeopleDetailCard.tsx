import { Link, useParams } from "react-router"
import { useItemFromCache } from "../../../hooks/useSearch"

export default function PeopleDetailCard() {
  const { id } = useParams()
  const {
    data: people,
    isFetching,
    error,
    isError,
  } = useItemFromCache("people", id!)

  return (
    <div className="flex flex-col gap-6 max-w-2xl w-full">
      <p className="font-bold text-lg">Details</p>
      {isFetching && <span>Loading...</span>}
      {isError && <span>Error: {error.message}</span>}
      <div className="flex flex-col p-4 gap-2 w-full rounded-2xl bg-blue-200 justify-center">
        <p className="font-bold text-slate-700 text-2xl">{people?.name}</p>
        <p className="font-bold text-slate-700">Gender: {people?.gender}</p>
        <p className="text-slate-700">
          <span className="font-bold">Height</span>: {people?.height}
        </p>
        <p className="text-slate-700">
          <span className="font-bold">Eye color</span>: {people?.eye_color}
        </p>
        <p className="text-slate-700">
          <span className="font-bold">Mass</span>: {people?.mass}
        </p>
      </div>
      <Link to="/search?q=people" className="p-2 bg-blue-600 rounded-2xl">
        Back
      </Link>
    </div>
  )
}
