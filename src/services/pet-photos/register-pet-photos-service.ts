import { PetPhotos } from '@prisma/client'
import { PetPhotosRepository } from '@/repositories/photos/prisma-pet-photos-repository'

interface RegisterPetPhotosRequest {
  photo: string
  pet_id: string
}

interface RegisterPetPhotoResponse {
  photo: PetPhotos
}

export class RegisterPetPhotoService {

  constructor(private petPhotosRepository: PetPhotosRepository) { }

  async execute({ photo, pet_id }: RegisterPetPhotosRequest): Promise<RegisterPetPhotoResponse> {
    const petPhoto = await this.petPhotosRepository.create({ photo, pet_id })
    return { photo: petPhoto }
  }
}
