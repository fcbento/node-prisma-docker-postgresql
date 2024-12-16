import { PetPhotos } from "@prisma/client";
import { PetPhotosRepository } from "@/repositories/photos/prisma-pet-photos-repository";

interface GetPetPhotosRequest {
  id: string;
}

interface GetPetPhotosResponse {
  photos: PetPhotos[]
}

export class GetPetPhotosService {

  constructor(private petPhotosRepository: PetPhotosRepository) { }

  async execute({ id }: GetPetPhotosRequest): Promise<GetPetPhotosResponse> {
    const photos = await this.petPhotosRepository.getPhotosByPetId(id)
    return { photos }
  }
}