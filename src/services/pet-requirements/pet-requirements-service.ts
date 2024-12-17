import { PetRequirements } from '@prisma/client'
import { PetRequirementsRepository } from '@/repositories/pet-requirements/pet-requirements-repository'

interface RegisterPetRequirementsRequest {
  requirement: string
  pet_id: string
}

interface RegisterPetRequirementsResponse {
  requirement: PetRequirements
}

export class RegisterPetRequirementsService {

  constructor(private petRequirementsRepository: PetRequirementsRepository) { }

  async execute({ requirement, pet_id }: RegisterPetRequirementsRequest): Promise<RegisterPetRequirementsResponse> {
    const petRequirement = await this.petRequirementsRepository.create({ requirement, pet_id })
    return { requirement: petRequirement }
  }
}
