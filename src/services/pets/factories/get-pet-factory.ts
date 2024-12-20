import { PrismaPetsRepository } from "@/repositories/pets/prisma-pets-repository"
import { GetPetService } from "../get-pet-service"

export function GetPetFacotry(){
  const petsRepository = new PrismaPetsRepository()
  const getPetService = new GetPetService(petsRepository)

  return getPetService
}