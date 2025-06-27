import { Link } from "react-router"

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      coucou la home
      <Link to={"/search"} className="p-2 bg-amber-200 rounded-full">
        Rechercher
      </Link>
    </div>
  )
}
