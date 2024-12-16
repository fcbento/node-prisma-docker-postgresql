import { GetPetFacotry } from "@/services/pets/factories/get-pet-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetById(request: FastifyRequest, reply: FastifyReply){

  const getPetBodySchema = z.object({
    id: z.string(),
  })

  const { id } = getPetBodySchema.parse(request.params)
  const getPetService = GetPetFacotry()

  const pet = await getPetService.execute({ id })
  reply.send(pet).status(200)
}