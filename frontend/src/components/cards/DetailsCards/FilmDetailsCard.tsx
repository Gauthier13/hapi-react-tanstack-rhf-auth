import { useSelector } from "react-redux"
import { useParams } from "react-router"
import type { TFilm } from "../../../validation-schemas/film.schema"
import type { RootState } from "../../../store/store"

export default function FilmDetailsCard() {
  const { id } = useParams()
  const film: TFilm | undefined = useSelector((state: RootState) =>
    state.films.list.find((f) => f.id === id)
  )
  return (
    <div className="flex flex-col gap-6 min-h-screen max-w-2xl w-full">
      <p className="font-bold text-lg">Details</p>
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
    </div>
  )
}
