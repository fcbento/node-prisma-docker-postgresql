import { Prisma, Pet } from "@prisma/client";

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  listPetsByCity(city: string, age?: string, energy?: string, size?: string ): Promise<Pet[]>
}