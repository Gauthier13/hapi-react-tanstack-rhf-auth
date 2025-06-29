import { Link, useParams } from "react-router"
import { useItemFromCache } from "../../../hooks/useSearch"

export default function FilmDetailsCard() {
  const { id } = useParams()

  const {
    data: film,
    isFetching,
    error,
    isError,
  } = useItemFromCache("films", id!)

  return (
    <div className="flex flex-col gap-6 max-w-2xl min-w-full">
      <p className="font-bold text-lg">Details</p>
      {isFetching && <span>Loading...</span>}
      {isError && <span>Error: {error.message}</span>}
      <div className="flex flex-col p-4 gap-2 rounded-2xl bg-amber-200 justify-center">
        <p className="font-bold text-slate-700 text-2xl">{film?.title}</p>
        <p className="font-bold text-slate-700">Episode: {film?.episode_id}</p>
        <p className="text-slate-700 text-balance">
          <span className="font-bold">Opening</span>: {film?.opening_crawl}
        </p>
        <p className="text-slate-700 text-balance">
          <span className="font-bold">Director</span>: {film?.director}
        </p>
        <p className="text-slate-700 text-balance">
          <span className="font-bold">Producer</span>: {film?.producer}
        </p>
        <p className="text-slate-700 text-balance">
          <span className="font-bold">Release date</span>: {film?.release_date}
        </p>
      </div>
      <Link to="/search?q=films" className="p-2 bg-blue-600 rounded-2xl">
        Back
      </Link>
    </div>
  )
}
