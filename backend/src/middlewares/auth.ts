import { Lifecycle, ResponseToolkit, Request } from "@hapi/hapi"

const auth: Lifecycle.Method = async (request: Request, h: ResponseToolkit) => {
  console.log("🚀 ~ request:", request.path)
  if (request.path === "/search") {
    return h.continue
  }

  const auth = request.headers.authorization
  if (!auth) {
    return h.response({ error: "Missing auth" }).code(401).takeover()
  }

  const [user, password] = Buffer.from(auth.replace("Basic ", ""), "base64")
    .toString()
    .split(":")
  console.log("🚀 ~ user:", user)
  console.log("🚀 ~ password:", password)

  if (user !== "Luke" || password !== "DadSucks") {
    return h.response({ error: "Invalid credentials" }).code(401).takeover()
  }

  return h.continue
}

export default auth
