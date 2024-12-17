import { PrismaPetPhotosRepository } from "@/repositories/photos/pet-photos-repository"
import { RegisterPetPhotoService } from "../register-pet-photos-service"

export function RegisterPetPhotosFacotry(){
  const petsRepository = new PrismaPetPhotosRepository()
  const registerPetPhotosService = new RegisterPetPhotoService(petsRepository)

  return registerPetPhotosService
}