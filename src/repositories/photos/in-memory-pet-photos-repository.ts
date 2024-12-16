import { Prisma, Pet, PetPhotos } from "@prisma/client";
import { PetPhotosRepository } from "./prisma-pet-photos-repository";
import { randomUUID } from "crypto";

export class InMemoryPetPhotosRepository implements PetPhotosRepository {
  public photos: PetPhotos[] = []

  async create(data: Prisma.PetPhotosUncheckedCreateInput): Promise<PetPhotos> {
    const photo = {
      id: randomUUID(),
      photo: data.photo,
      pet_id: data.pet_id
    }
    
    this.photos.push(photo)
    
    return photo
  }

  async getPhotosByPetId(id: string): Promise<PetPhotos[]> {
    const photosByPet = this.photos.filter(photo => photo.pet_id === id);
    return photosByPet
  }
}