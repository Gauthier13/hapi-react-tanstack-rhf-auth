import { ServerRoute } from "@hapi/hapi"

const home: ServerRoute = {
  method: "GET",
  path: "/",
  handler: () => {
    return "Hello buddy"
  },
}

export default home
