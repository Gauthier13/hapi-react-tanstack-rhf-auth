import { Link } from "react-router"
import { peopleSchema } from "../../validation-schemas/people.schema"

export default function CardPeople(data: unknown) {
  const result = peopleSchema.safeParse(data.data)

  if (!result.success) {
    return <p className="text-sm text-red-500">Invalid data</p>
  }

  const people = result.data
  return (
    <div className="flex flex-col gap-4 items-center p-3 bg-slate-800 rounded-3xl">
      <div className="flex gap-4 items-center justify-between w-full">
        <h2>{people.name}</h2>
        <Link
          to={`/search/peoples/${people.id}`}
          className="bg-amber-200 hover:bg-amber-400 rounded-2xl p-2 text-slate-700"
        >
          See
        </Link>
      </div>
    </div>
  )
}
