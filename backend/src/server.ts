"use strict"

import Hapi from "@hapi/hapi"
import auth from "./middlewares/auth"
import searchRoute from "./routes/seach"

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
        credentials: true,
        headers: ["Authorization", "Content-Type"],
        additionalHeaders: ["authorization", "content-type"],
      },
    },
  })

  server.ext("onPreHandler", auth)
  server.route(searchRoute)

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "hello buddy"
    },
  })

  await server.start()
  console.log("Server running on %s", server.info.uri)
}

process.on("unhandledRejection", (err) => {
  console.log(err)
  process.exit(1)
})

init()
