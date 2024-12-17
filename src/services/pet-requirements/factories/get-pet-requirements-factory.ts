import { GetPetRequirementsService } from "../get-pet-requirements-service"
import { PrismaPetRequirementsRepository } from "@/repositories/pet-requirements/prisma-pet-requirements-repository"

export function GetPetRequirementsFacotry(){
  const repository = new PrismaPetRequirementsRepository()
  const service = new GetPetRequirementsService(repository)

  return service
}