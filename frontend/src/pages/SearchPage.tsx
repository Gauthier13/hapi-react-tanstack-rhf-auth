import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useDebounce } from "../hooks/useDebounce"

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

  const watchCategory = watch("category")
  const debouncedCategory = useDebounce(watchCategory, 1000)

  const { isPending, isError, data, error } = useQuery({
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
    enabled: !!debouncedCategory,
    staleTime: 2 * 60 * 1000,
  })

  const onSubmit = (data: SearchFormData) => {
    console.log("Form submitted with:", data)
  }

  console.log("🚀 ~ data:", data)

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

      {isPending && <span>Loading...</span>}

      {isError && <span>Error: {error.message}</span>}

      {data && (
        <div className="mt-4">
          <h3 className="font-bold">Results:</h3>
          <pre className="p-2 rounded">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
