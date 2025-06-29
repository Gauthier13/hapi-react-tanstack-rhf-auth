import { Link } from "react-router"

export default function Home() {
  return (
    <div className="flex flex-col gap-4 min-h-screen justify-center items-center">
      <p className="font-bold text-2xl">Welcome !</p>
      <Link
        to={"/search"}
        className="p-2 bg-amber-200 rounded-full text-slate-700 hover:font-bold w-96"
      >
        Search
      </Link>
    </div>
  )
}
