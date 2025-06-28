import { Link } from "react-router"
import { filmSchema } from "../../validation-schemas/film.schema"

export default function CardFilms(data: unknown) {
  const result = filmSchema.safeParse(data.data) //c'est moche ça

  if (!result.success) {
    return <p className="text-sm text-red-500">Invalid data</p>
  }

  const film = result.data
  return (
    <div className="flex flex-col gap-4 items-center p-3 bg-slate-800 rounded-2xl">
      <div className="flex gap-4 items-center justify-between w-full">
        <h2>{film.title}</h2>
        <Link
          to={`/search/films/${film.id}`}
          className="bg-amber-200 hover:bg-amber-400 rounded-2xl p-2 text-slate-700"
        >
          See
        </Link>
      </div>
    </div>
  )
}
