import { Lifecycle, ResponseToolkit, Request } from "@hapi/hapi"

const auth: Lifecycle.Method = async (request: Request, h: ResponseToolkit) => {
  if (request.path !== "/search") {
    return h.continue
  }

  const auth = request.headers.authorization
  if (!auth) {
    return h
      .response({ error: "Missing auth", redirectTo: "/" })
      .code(401)
      .takeover()
  }

  const [user, password] = Buffer.from(auth.replace("Basic ", ""), "base64")
    .toString()
    .split(":")

  if (user !== "Luke" || password !== "DadSucks") {
    return h
      .response({ error: "Invalid credentials", redirectTo: "/" })
      .code(401)
      .takeover()
  }

  return h.continue
}

export default auth
