import { GetPetPhotosFacotry } from "@/services/pet-photos/factories/get-pet-photos-factory";
import { ListPetFacotry } from "@/services/pets/factories/list-pet-factory";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function listPet(request: FastifyRequest, reply: FastifyReply) {

  const registerBodySchema = z.object({
    city: z.string(),
    age: z.optional(z.string()),
    energy: z.optional(z.string()),
    size: z.optional(z.string())
  })
  const { city } = registerBodySchema.parse(request.query)
  const { age } = registerBodySchema.parse(request.query)
  const { energy } = registerBodySchema.parse(request.query)
  const { size } = registerBodySchema.parse(request.query)

  const listService = ListPetFacotry()
  const getPhotosService = GetPetPhotosFacotry()

  const pets = await listService.execute({ city, age, energy, size })

  for (let pet of pets.pets) {
    (pet as any).photos = (await getPhotosService.execute({ id: pet.id })).photos
  }

  reply.send(pets).status(200)
}
