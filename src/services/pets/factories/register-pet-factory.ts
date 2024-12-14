import { RegisterPetService } from "../pets-service";
import { PrismaPetsRepository } from "@/repositories/pets/pets-repository";

export function RegisterPetFacotry(){
  const petsRepository = new PrismaPetsRepository()
  const registerPetService = new RegisterPetService(petsRepository)

  return registerPetService
}