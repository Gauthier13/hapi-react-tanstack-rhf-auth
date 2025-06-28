"use strict"

import Hapi from "@hapi/hapi"
import auth from "./middlewares/auth"
import searchRoute from "./routes/search"

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: [
          "https://frontend-mkj02gw7s-gauthier13s-projects.vercel.app",
          "http://localhost:5173",
        ],
        credentials: true,
        headers: ["Authorization", "Content-Type"],
        additionalHeaders: ["authorization", "content-type"],
      },
    },
  })

  server.ext("onPreHandler", auth)
  server.route(searchRoute)

  await server.start()
  console.log("Server running on %s", server.info.uri)
}

process.on("unhandledRejection", (err) => {
  console.log(err)
  process.exit(1)
})

init()
