import { Request, ResponseToolkit, Lifecycle } from "@hapi/hapi"
import * as Boom from "@hapi/boom"

const authMiddleware: Lifecycle.Method = (
  request: Request,
  h: ResponseToolkit
) => {
  if (request.path === "/search") {
    console.log(`Protected Route: ${request.path}`)

    if (!request.auth.isAuthenticated) {
      return Boom.unauthorized(
        "Access denied, you need to be authentified to access the search function"
      )
    }

    if (!request.auth.credentials) {
      return Boom.unauthorized("Invalid credentials")
    }

    return h.continue
  }

  // Every other route, free access
  return h.continue
}

export default authMiddleware
