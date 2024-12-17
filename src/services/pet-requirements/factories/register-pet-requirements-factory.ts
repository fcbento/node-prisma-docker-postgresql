import { PrismaPetRequirementsRepository } from "@/repositories/pet-requirements/prisma-pet-requirements-repository"
import { RegisterPetRequirementsService } from "../pet-requirements-service"

export function RegisterPetRequirementsFacotry(){
  const repository = new PrismaPetRequirementsRepository()
  const service = new RegisterPetRequirementsService(repository)

  return service
}