import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

type LoginFormData = {
  username: string
  password: string
}

export const LoginPage = () => {
  const navigate = useNavigate()

  const { login, isLoading, error } = useContext(AuthContext)

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      username: "Luke",
    },
  })

  const watchUsername = watch("username")
  const watchPassword = watch("password")

  const onSubmit = () => {
    login(watchUsername, watchPassword)
    navigate("/search")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-6 min-h-screen items-center justify-center"
    >
      <div className="flex flex-col gap-3 items-center">
        <p className="font-black text-2xl">Log in</p>
        <input
          className="p-2 bg-slate-900 rounded-2xl text-white"
          type="text"
          placeholder="Username"
          aria-label="username"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 2,
              message: "Username must be at least 2 characters",
            },
          })}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
        <input
          className="p-2 bg-slate-900 rounded-2xl text-white"
          type="password"
          placeholder="Password"
          aria-label="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 3,
              message:
                "Password must be at least 3 characters (but not for a real project)",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="p-2 w-full bg-blue-900 rounded-2xl text-white"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
        {error && <p className="text-red-500 ">Error: {error.message}</p>}
      </div>
    </form>
  )
}
