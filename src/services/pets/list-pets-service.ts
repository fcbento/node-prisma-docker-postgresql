import { Pet } from "@prisma/client";
import { PetsRepository } from '../../repositories/pets/prisma-pets-repository';

interface ListPetRequest {
  city: string;
}

interface ListPetResponse {
  pets: Pet[]
}

export class ListPetService {

  constructor(private petsRepository: PetsRepository) { }

  async execute({ city }: ListPetRequest): Promise<ListPetResponse> {
    const pets = await this.petsRepository.listPetsByCity(city)
    return { pets }
  }
}