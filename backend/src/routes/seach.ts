import { ServerRoute } from "@hapi/hapi"
import Joi from "joi"
import searchController from "../controllers/searchController"

const searchRoute: ServerRoute = {
  method: "GET",
  path: "/search",
  handler: searchController,
}

export default searchRoute
