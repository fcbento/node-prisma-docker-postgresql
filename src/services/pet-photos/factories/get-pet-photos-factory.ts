import { PrismaPetPhotosRepository } from "@/repositories/photos/pet-photos-repository"

export function GetPetPhotosFacotry(){
  const petsRepository = new PrismaPetPhotosRepository()
  const getPetPhotosService = new GetPetPhotosService(petsRepository)

  return getPetPhotosService
}