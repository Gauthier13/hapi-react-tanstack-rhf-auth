import { ResponseToolkit, Request } from "@hapi/hapi"
import { searchAll } from "../services/swapiService"

export default async (_: Request, h: ResponseToolkit) => {
  try {
    const results = await searchAll()
    console.log("🚀 ~ results:", results)
    return h.response(results).code(200)
  } catch (err) {
    console.error(err)
    return h
      .response({ error: "Internal Error in search controller" })
      .code(500)
  }
}
