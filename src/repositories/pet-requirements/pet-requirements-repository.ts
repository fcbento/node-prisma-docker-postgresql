import { Prisma, PetRequirements } from "@prisma/client";

export interface PetRequirementsRepository {
  create(data: Prisma.PetRequirementsUncheckedCreateInput): Promise<PetRequirements>
  getRequirementsByPetId(id: string): Promise<PetRequirements[]>
}