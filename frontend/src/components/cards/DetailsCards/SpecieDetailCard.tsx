import { useSelector } from "react-redux"
import { Link, useParams } from "react-router"
import type { RootState } from "../../../store/store"
import type { TSpecies } from "../../../validation-schemas/species.schema"

export default function SpecieDetailCard() {
  const { id } = useParams()
  const specie: TSpecies | undefined = useSelector((state: RootState) =>
    state.species.list.find((p) => p.id === id)
  )
  return (
    <div className="flex flex-col gap-6 min-h-screen max-w-2xl w-full">
      <p className="font-bold text-lg">Details</p>
      <div className="flex flex-col p-4 gap-2 rounded-2xl bg-stone-300 justify-center">
        <p className="font-bold text-slate-700 text-2xl">{specie?.name}</p>
        <p className=" text-slate-700">
          <span className="font-bold"> Average lifespan:</span>{" "}
          {specie?.average_lifespan} years
        </p>
        <p className="text-slate-700">
          <span className="font-bold">Language</span>: {specie?.language}
        </p>
        <p className="text-slate-700">
          <span className="font-bold">Skin colors</span>: {specie?.skin_colors}
        </p>
        <p className="text-slate-700">
          <span className="font-bold">Classification</span>:{" "}
          {specie?.classification}
        </p>
        <p className="text-slate-700">
          <span className="font-bold">Eye colors</span>: {specie?.eye_colors}
        </p>
        <p className="text-slate-700">
          <span className="font-bold">Designation</span>: {specie?.designation}
        </p>
        <Link to="/search?q=planets" className="p-2 bg-blue-600 rounded-2xl">
          Back
        </Link>
      </div>
    </div>
  )
}
