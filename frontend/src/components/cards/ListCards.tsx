import { Cards } from "./Cards"

export default function ListCards({
  data,
  category,
}: {
  data: any
  category: string
}) {
  return (
    <div className="p-4 bg-slate-900 rounded-3xl mt-4">
      <div className="h-96 overflow-y-auto p-4">
        <ul>
          {data.map((data) => {
            return (
              <li className="mt-3" key={data.id}>
                <Cards key={data.id} category={category} data={data} />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
