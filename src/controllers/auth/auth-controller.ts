import { AuthType } from "@/enums/auth-type.enum";
import { AuthFacotry } from "@/services/auth/factories/auth-factory";
import { UserAlreadyExistsError } from "@/services/users/errors/user-already-exists-error";
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
   
    await authService.execute({ email, password }, AuthType.ORG)
  } catch (err) {
    if(err instanceof UserAlreadyExistsError) {
      return reply.status(409).send(err)
    } 
  }

  return reply.status(201).send()

}