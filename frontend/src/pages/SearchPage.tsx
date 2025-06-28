import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useDebounce } from "../hooks/useDebounce"
import { Cards } from "../components/cards/Cards"
import { useEffect } from "react"
import { setFilms } from "../store/filmsSlice"
import { useDispatch } from "react-redux"

type SearchFormData = {
  category: string
}

export default function SearchPage() {
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
  } = useQuery({
    queryKey: ["search", debouncedCategory],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/search?q=${debouncedCategory}`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${btoa(`Luke:DadSucks`)}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`)
      }

      return response.json()
    },
    enabled: !!debouncedCategory && debouncedCategory.length >= 2,
    staleTime: 2 * 60 * 1000,
  })
  console.log("🚀 ~ result:", result)

  const onSubmit = (data: SearchFormData) => {
    console.log("Form submitted with:", data)
  }

  useEffect(() => {
    if (result && result.success) {
      console.log("coucou")

      if (result.category === "films") {
        dispatch(setFilms(result.data))
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
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded-2xl hover:bg-blue-600"
          >
            Search
          </button>
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
          <h3 className="font-bold">Results:</h3>
          {result.data.map((data: unknown) => {
            return (
              <Cards key={data.id} category={debouncedCategory} data={data} />
            )
          })}
        </div>
      )}
    </div>
  )
}
