import { GetPetPhotosFacotry } from "@/services/pet-photos/factories/get-pet-photos-factory";
import { GetPetFacotry } from "@/services/pets/factories/get-pet-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetById(request: FastifyRequest, reply: FastifyReply) {

  const getPetBodySchema = z.object({
    id: z.string(),
  })

  const { id } = getPetBodySchema.parse(request.params)
  const getPetService = GetPetFacotry()
  const getPetPhotosSerice = GetPetPhotosFacotry()

  const pet = await getPetService.execute({ id })
  const petPhotos = await getPetPhotosSerice.execute({ id })
  reply.send({ ...pet, photos: petPhotos.photos }).status(200)
}