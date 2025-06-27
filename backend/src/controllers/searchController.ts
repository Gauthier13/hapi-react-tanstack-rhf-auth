import { ResponseToolkit, Request } from "@hapi/hapi"
import { searchAll } from "../services/swapiService"

export default async (_: Request, h: ResponseToolkit) => {
  try {
    const results = await searchAll()
    return h.response(results).code(200)
  } catch (err) {
    console.error(err)
    return h.response({ error: "Internal Error" }).code(500)
  }
}
