import { Pet } from "@prisma/client";
import { PetsRepository } from '../../repositories/pets/prisma-pets-repository';

interface GetPetRequest {
  id: string;
}

interface GetPetResponse {
  pet: Pet | null
}

export class GetPetService {

  constructor(private petsRepository: PetsRepository) { }

  async execute({ id }: GetPetRequest): Promise<GetPetResponse> {
    const pet = await this.petsRepository.findById(id)
    return { pet }
  }
}