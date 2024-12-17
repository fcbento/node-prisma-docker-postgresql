import { GetPetPhotosFacotry } from "@/services/pet-photos/factories/get-pet-photos-factory";
import { GetPetRequirementsFacotry } from "@/services/pet-requirements/factories/get-pet-requirements-factory";
import { GetPetFacotry } from "@/services/pets/factories/get-pet-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetById(request: FastifyRequest, reply: FastifyReply) {

  const getPetBodySchema = z.object({
    id: z.string(),
  })

  const { id } = getPetBodySchema.parse(request.params)
  const getPetService = GetPetFacotry()
  const getPetPhotosService = GetPetPhotosFacotry()
  const getPetRequirementsService = GetPetRequirementsFacotry()

  const pet = await getPetService.execute({ id })
  const petPhotos = await getPetPhotosService.execute({ id })
  const petRequirements = await getPetRequirementsService.execute({ id })

  reply.send({ ...pet, photos: petPhotos.photos, requirements: petRequirements.requirements }).status(200)
}