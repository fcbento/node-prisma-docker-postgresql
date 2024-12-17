import { Prisma, PetRequirements } from "@prisma/client";
import { PetRequirementsRepository } from "./pet-requirements-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetRequirementsRepository implements PetRequirementsRepository {

  async create(data: Prisma.PetRequirementsUncheckedCreateInput): Promise<PetRequirements> {
      const requirement = await prisma.petRequirements.create({
          data
        })
        return requirement
  }

  async getRequirementsByPetId(id: string): Promise<PetRequirements[]> {
    const requirements = await prisma.petRequirements.findMany({
      where: {
        pet_id: id
      }
    })
    return requirements
  }
}