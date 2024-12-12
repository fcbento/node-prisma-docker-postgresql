import { AuthType } from "@/enums/auth-type.enum";
import { InvalidCredentialsError } from "@/services/auth/errors/invalid-credentials-error";
import { AuthFacotry } from "@/services/auth/factories/auth-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function auth(request: FastifyRequest, reply: FastifyReply) {

  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authBodySchema.parse(request.body)

  try {
    const authService = AuthFacotry()
    const { entity } = await authService.execute({ email, password }, AuthType.ORG)

    const token = await reply.jwtSign(
      {
        role: entity.role
      },
      {
        sign: {
          sub: entity.id
        }
      })

    const refreshToken = await reply.jwtSign(
      {
        role: entity.role
      },
      {
        sign: {
          sub: entity.id,
          expiresIn: '7d'
        }
      })
    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true
      })
      .status(200).send({
        token
      })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
  }
}