import { ServerRoute } from "@hapi/hapi"
import searchController from "../controllers/searchController"

const searchRoute: ServerRoute = {
  method: "GET",
  path: "/search",
  handler: searchController,
  options: {
    auth: "jwt_strategy",
  },
}

export default searchRoute
