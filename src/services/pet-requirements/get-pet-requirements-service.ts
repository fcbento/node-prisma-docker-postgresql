import { PetRequirementsRepository } from "@/repositories/pet-requirements/pet-requirements-repository";
import { PetRequirements } from "@prisma/client";

interface GetPetRequirementsRequest {
  id: string;
}

interface GetPetRequirementsResponse {
  requirements: PetRequirements[]
}

export class GetPetRequirementsService {

  constructor(private petRequirementsRepository: PetRequirementsRepository) { }

  async execute({ id }: GetPetRequirementsRequest): Promise<GetPetRequirementsResponse> {
    const requirements = await this.petRequirementsRepository.getRequirementsByPetId(id)
    return { requirements }
  }
}