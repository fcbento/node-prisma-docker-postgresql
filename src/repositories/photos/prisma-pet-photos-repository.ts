import { Prisma, PetPhotos } from "@prisma/client";

export interface PetPhotosRepository {
  create(data: Prisma.PetPhotosUncheckedCreateInput): Promise<PetPhotos>
  getPhotosByPetId(id: string): Promise<PetPhotos[]>
}