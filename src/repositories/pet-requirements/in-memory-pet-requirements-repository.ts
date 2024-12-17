import { Prisma, PetRequirements } from "@prisma/client";
import { randomUUID } from "crypto";
import { PetRequirementsRepository } from "./pet-requirements-repository";

export class InMemoryPetRequirementsRepository implements PetRequirementsRepository {

  public requirements: PetRequirements[] = []

  async create(data: Prisma.PetRequirementsUncheckedCreateInput): Promise<PetRequirements> {
    const requirement = {
      id: randomUUID(),
      requirement: data.requirement,
      pet_id: data.pet_id
    }
    
    this.requirements.push(requirement)
    
    return requirement
  }

  async getRequirementsByPetId(id: string): Promise<PetRequirements[]> {
    const requirements = this.requirements.filter(requirement => requirement.pet_id === id)
    return requirements
  }
}