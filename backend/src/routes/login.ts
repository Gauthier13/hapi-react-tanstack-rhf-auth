import { ServerRoute } from "@hapi/hapi"
import loginController from "../controllers/loginController"
import Joi from "joi"

const loginRoute: ServerRoute = {
  method: "POST",
  path: "/login",
  options: {
    auth: false,
    validate: {
      payload: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
    },
  },
  handler: loginController,
}

export default loginRoute
