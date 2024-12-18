import { PrismaPetsRepository } from "@/repositories/pets/prisma-pets-repository";
import { RegisterPetService } from "../pets-service";

export function RegisterPetFacotry(){
  const petsRepository = new PrismaPetsRepository()
  const registerPetService = new RegisterPetService(petsRepository)

  return registerPetService
}