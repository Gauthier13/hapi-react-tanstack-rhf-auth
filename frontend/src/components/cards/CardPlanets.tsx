import { Link } from "react-router"
import { planetSchema } from "../../validation-schemas/planet.shema"

export default function CardPlanets(data: unknown) {
  const result = planetSchema.safeParse(data.data)

  if (!result.success) {
    return <p className="text-sm text-red-500">Invalid data</p>
  }

  const planet = result.data
  return (
    <div className="flex flex-col gap-4 items-center p-3 rounded-2xl">
      <div className="flex gap-4 items-center">
        <h2>{planet.name}</h2>
        <Link
          to={`/search/planets/${planet.id}`}
          className="bg-amber-200 hover:bg-amber-400 rounded-2xl p-2 text-slate-700"
        >
          See
        </Link>
      </div>
    </div>
  )
}
