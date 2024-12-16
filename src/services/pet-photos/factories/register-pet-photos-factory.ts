import { PrismaPetPhotosRepository } from "@/repositories/photos/pet-photos-repository"

export function RegisterPetPhotosFacotry(){
  const petsRepository = new PrismaPetPhotosRepository()
  const registerPetPhotosService = new RegisterPePhotostService(petsRepository)

  return registerPetPhotosService
}