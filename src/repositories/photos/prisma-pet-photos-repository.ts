import { Prisma, PetPhotos } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PetPhotosRepository } from "./pet-photos-repository";


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