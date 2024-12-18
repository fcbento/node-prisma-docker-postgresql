import { PrismaPetsRepository } from "@/repositories/pets/prisma-pets-repository"
import { ListPetService } from "../list-pets-service"

export function ListPetFacotry(){
  const petsRepository = new PrismaPetsRepository()
  const listPetService = new ListPetService(petsRepository)

  return listPetService
}