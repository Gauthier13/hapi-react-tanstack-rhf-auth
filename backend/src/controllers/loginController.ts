import { Request, ResponseToolkit } from "@hapi/hapi"
import { JWT_SECRET } from "../server"
import { LoginPayload, LoginResponse, User } from "../types/auth"
import * as Boom from "@hapi/boom"
import * as Jwt from "@hapi/jwt"

const users = [{ id: 1, username: "Luke", password: "DadSucks" }]

export default async (
  request: Request,
  h: ResponseToolkit
): Promise<LoginResponse | Boom.Boom> => {
  const { username, password } = request.payload as LoginPayload

  const user: User | undefined = users.find(
    (u) => u.username === username && u.password === password
  )

  if (!user) {
    return Boom.unauthorized("Invalid credentials")
  }

  const token: string = Jwt.token.generate(
    { user: { id: user.id, username: user.username } },
    JWT_SECRET,
    { ttlSec: 14400 } // 4 hours
  )
  const response: LoginResponse = {
    token,
    user: { id: user.id, username: user.username },
  }

  return response
}
