import { useSelector } from "react-redux"
import { Link, useParams } from "react-router"
import type { RootState } from "../../../store/store"
import type { TPeople } from "../../../validation-schemas/people.schema"

export default function PeopleDetailCard() {
  const { id } = useParams()
  const people: TPeople | undefined = useSelector((state: RootState) =>
    state.peoples.list.find((p) => p.id === id)
  )
  return (
    <div className="flex flex-col gap-6 min-h-screen max-w-2xl w-full">
      <p className="font-bold text-lg">Details</p>
      <div className="flex flex-col p-4 gap-2 rounded-2xl bg-blue-200 justify-center">
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

        <Link to="/search?q=peoples" className="p-2 bg-blue-600 rounded-2xl">
          Back
        </Link>
      </div>
    </div>
  )
}
