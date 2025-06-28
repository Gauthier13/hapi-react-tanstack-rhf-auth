// pages/SearchPage.tsx
import { useForm } from "react-hook-form"
import { useDebounce } from "../hooks/useDebounce"
import ListCards from "../components/cards/ListCards"
import { useSearch } from "../hooks/useSearch"
import { useSearchParams } from "react-router"
import { useEffect } from "react"

type SearchFormData = {
  category: string
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("q")

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SearchFormData>({
    defaultValues: {
      category: "",
    },
  })

  const watchCategory = watch("category")
  const debouncedCategory = useDebounce(watchCategory, 1000)

  useEffect(() => {
    if (query) {
      setValue("category", query)
    }
  }, [query, setValue])

  const {
    data: result,
    isFetching,
    error,
    isError,
  } = useSearch(debouncedCategory || (query ?? ""))

  const onSubmit = (data: SearchFormData) => {
    if (data.category) {
      setSearchParams({ q: data.category })
    }
  }

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
      {isError && <span>Error: {error?.message}</span>}

      {result && !result.success && (
        <div className="flex flex-col gap-4">
          <p className="text-red-500 text-sm">{result.message}</p>
          <p className="text-sm">No results</p>
        </div>
      )}

      {result && result.success && (
        <div className="mt-4">
          <h3 className="font-bold">Results: {debouncedCategory || query}</h3>
          <ListCards data={result.data} category={debouncedCategory || query} />
        </div>
      )}
    </div>
  )
}
