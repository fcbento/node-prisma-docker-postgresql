import { ListPetFacotry } from "@/services/pets/factories/list-pet-factory";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function listPet(request: FastifyRequest, reply: FastifyReply) {

  const registerBodySchema = z.object({
    city: z.string(),
  })

  const { city } = registerBodySchema.parse(request.params)
  const listService = ListPetFacotry()

  const pets = await listService.execute({ city })
  reply.send(pets).status(200)
}
