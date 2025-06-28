import { useForm } from "react-hook-form"
import { useDebounce } from "../hooks/useDebounce"
import { useEffect, useState } from "react"
import { setFilms } from "../store/filmsSlice"
import { useDispatch } from "react-redux"
import { setPlanets } from "../store/planetsSlice"
import { setPeoples } from "../store/peoplesSlice"
import { setSpecies } from "../store/speciesSlice"
import { setStarships } from "../store/starshipsSlice"
import { setVehicles } from "../store/vehiclesSlice"
import { useSearchParams } from "react-router"
import ListCards from "../components/cards/ListCards"
import { useSearch } from "../hooks/useSearch"

import { useStoreData } from "../hooks/useStoreData"

type SearchFormData = {
  category: string
}

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q")

  const [dataToDisplay, setDataToDisplay] = useState<any[]>([])
  const { films, planets, peoples, vehicles, starships, species } =
    useStoreData()

  useEffect(() => {
    if (!query) {
      return
    }
    if (query && query === "films") {
      setDataToDisplay(films.list)
    }
    if (query && query === "planets") {
      setDataToDisplay(planets.list)
    }
    if (query && query === "people") {
      setDataToDisplay(peoples.list)
    }
    if (query && query === "species") {
      setDataToDisplay(species.list)
    }
    if (query && query === "starships") {
      setDataToDisplay(starships.list)
    }
    if (query && query === "vehicles") {
      setDataToDisplay(vehicles.list)
    }
  }, [
    films.list,
    peoples.list,
    planets.list,
    query,
    species.list,
    starships.list,
    vehicles.list,
  ])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SearchFormData>({
    defaultValues: {
      category: "",
    },
  })

  const dispatch = useDispatch()
  const watchCategory = watch("category")
  const debouncedCategory = useDebounce(watchCategory, 1000)

  const {
    isError,
    data: result,
    error,
    isFetching,
  } = useSearch(debouncedCategory)

  const onSubmit = (data: SearchFormData) => {
    console.log("Form submitted with:", data)
  }

  useEffect(() => {
    if (result && result.success) {
      if (result.category === "films") {
        dispatch(setFilms(result.data))
      }
      if (result.category === "planets") {
        dispatch(setPlanets(result.data))
      }
      if (result.category === "people") {
        dispatch(setPeoples(result.data))
      }
      if (result.category === "species") {
        dispatch(setSpecies(result.data))
      }
      if (result.category === "starships") {
        dispatch(setStarships(result.data))
      }
      if (result.category === "vehicles") {
        dispatch(setVehicles(result.data))
      }
    }
  }, [result, dispatch])

  return (
    <div className="flex flex-col gap-4 items-center">
      <p className="font-black">What are you looking for ?</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2 items-center justify-center">
          <label aria-label="category label" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            className="bg-amber-100 rounded-2xl text-slate-700 px-2"
            aria-label="category"
            {...register("category", {
              required: "Category is required",
              minLength: {
                value: 2,
                message: "Category must be at least 2 characters",
              },
            })}
          />
        </div>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </form>

      {isFetching && <span>Loading...</span>}

      {isError && <span>Error: {error.message}</span>}

      {result && !result.success && (
        <div className="flex flex-col gap-4">
          <p className="text-red-500 text-sm">{result.message}</p>
          <p className="text-sm">No results</p>
        </div>
      )}

      {result && result.success && (
        <div className="mt-4">
          <h3 className="font-bold">Results: {debouncedCategory}</h3>
          <ListCards data={result.data} category={debouncedCategory} />
        </div>
      )}

      {dataToDisplay.length > 0 && query && debouncedCategory.length === 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Results: {query}</h3>
          <ListCards data={dataToDisplay} category={query} />
        </div>
      )}
    </div>
  )
}
