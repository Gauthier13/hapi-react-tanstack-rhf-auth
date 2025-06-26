import { ServerRoute } from "@hapi/hapi"
import Joi from "joi"
import searchController from "../controllers/searchController"

const route: ServerRoute = {
  method: "GET",
  path: "search",
  handler: searchController,
  options: {
    validate: {
      query: Joi.object({ q: Joi.string().min(1).required() }),
      failAction: (_req, _h, error) => {
        throw error
      },
    },
  },
}

export default route
