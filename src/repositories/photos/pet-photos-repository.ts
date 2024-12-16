import { Prisma, PetPhotos } from "@prisma/client";
import { PetPhotosRepository } from "./prisma-pet-photos-repository";
import { prisma } from "@/lib/prisma";


export class PrismaPetPhotosRepository implements PetPhotosRepository {

  async create(data: Prisma.PetPhotosUncheckedCreateInput): Promise<PetPhotos> {
    const pet = await prisma.petPhotos.create({
      data
    })
    return pet
  }

  async getPhotosByPetId(id: string): Promise<PetPhotos[]> {
    const petPhotos = await prisma.petPhotos.findMany({
      where: {
        pet_id: id
      }
    })
    return petPhotos
  }

}