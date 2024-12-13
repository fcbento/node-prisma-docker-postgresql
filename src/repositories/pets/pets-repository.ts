import { User, Prisma, Pet } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PetsRepository } from "./prisma-pets-repository";

export class PrismaPetsRepository implements PetsRepository {
  
  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id
      }
    })
    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data
    })
    return pet
  }
}