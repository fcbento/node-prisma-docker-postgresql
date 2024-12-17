import { RegisterPetFacotry } from "@/services/pets/factories/register-pet-factory";
import { UserAlreadyExistsError } from "@/services/users/errors/user-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerPet(request: FastifyRequest, reply: FastifyReply) {

  const registerBodySchema = z.object({
    name: z.string(),
    age: z.string(),
    cep: z.string(),
    description: z.string(),
    energy: z.string(),
    environment: z.string(),
    org_id: z.string(),
    size: z.string(),
    photos: z.array(z.string()),
    requirements: z.array(z.string())
  })

  const { name, age, cep, description, energy, environment, org_id, size, photos, requirements } = registerBodySchema.parse(request.body)
  try {
    const registerService = RegisterPetFacotry()
    const pet = await registerService.execute({ name, age, cep, description, energy, environment, org_id, size, photos, requirements })
    return reply.status(201).send(pet)
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(400).send(err)
    }
  }

  return reply.status(201).send()

}