"use strict"

import Hapi from "@hapi/hapi"
import searchRoute from "./routes/search"
import loginRoute from "./routes/login"
const Jwt = require("@hapi/jwt")

export const JWT_SECRET = "dark-sousls-3-est-mieux-que-elden-ring"

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: [
          "https://frontend-cmqpwrkg7-gauthier13s-projects.vercel.app",
          "http://localhost:5173",
        ],
        credentials: true,
        headers: ["Authorization", "Content-Type"],
        additionalHeaders: ["authorization", "content-type"],
      },
    },
  })

  // register jwt with the server
  await server.register(Jwt)

  server.auth.strategy("jwt_strategy", "jwt", {
    keys: JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400, //4 hours
      timeSkewSec: 15,
    },
    validate: (artifacts) => {
      return {
        isValid: true,
        credentials: { user: artifacts.decoded.payload.user },
      }
    },
  })

  server.route([loginRoute, searchRoute])

  await server.start()
  console.log("Server running on %s", server.info.uri)
}

process.on("unhandledRejection", (err) => {
  console.log(err)
  process.exit(1)
})

init()
