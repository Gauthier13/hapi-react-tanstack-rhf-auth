import { Link } from "react-router"

export default function Home() {
  return (
    <div className="flex flex-col gap-2 min-h-screen justify-center">
      Welcome
      <Link
        to={"/search"}
        className="p-2 bg-amber-200 rounded-full text-slate-700 hover:font-bold"
      >
        Search
      </Link>
    </div>
  )
}
