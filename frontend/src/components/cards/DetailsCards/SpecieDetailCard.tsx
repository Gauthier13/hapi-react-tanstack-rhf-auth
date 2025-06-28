import { Link, useParams } from "react-router"
import { useItemFromCache } from "../../../hooks/useSearch"

export default function SpecieDetailCard() {
  const { id } = useParams()
  const {
    data: specie,
    isFetching,
    error,
    isError,
  } = useItemFromCache("species", id!)
  return (
    <div className="flex flex-col gap-6 max-w-2xl w-full">
      <p className="font-bold text-lg">Details</p>
      {isFetching && <span>Loading...</span>}
      {isError && <span>Error: {error.message}</span>}
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
      </div>
      <Link to="/search?q=species" className="p-2 bg-blue-600 rounded-2xl">
        Back
      </Link>
    </div>
  )
}
