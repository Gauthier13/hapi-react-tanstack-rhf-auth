import { filmSchema } from "../../validation-schemas/film.schema"

export default function CardFilms(data: unknown) {
  const result = filmSchema.safeParse(data.data) //c'est moche ça

  if (!result.success) {
    return <p className="text-sm text-red-500">Invalid data</p>
  }

  const film = result.data
  console.log("🚀 ~ film:", film)
  return (
    <div className="flex flex-col gap-4 items-center p-3 rounded-2xl">
      <h2>{film.title}</h2>
    </div>
  )
}
