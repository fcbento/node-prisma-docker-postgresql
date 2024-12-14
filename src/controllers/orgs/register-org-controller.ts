import { RegisterOrgFacotry } from "@/services/orgs/factories/register-org-factory";
import { UserAlreadyExistsError } from "@/services/users/errors/user-already-exists-error";
import { RegisterUserFacotry } from "@/services/users/factories/register-user-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerOrg(request: FastifyRequest, reply: FastifyReply) {

  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.string(),
    whatsapp: z.string()
  })

  const { name, email, password, cep, whatsapp } = registerBodySchema.parse(request.body)

  try {
    const registerService = RegisterOrgFacotry()
    await registerService.execute({ name, email, password, cep, whatsapp })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send(err)
    }
  }

  return reply.status(201).send()

}