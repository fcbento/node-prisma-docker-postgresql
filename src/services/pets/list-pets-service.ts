import { PetsRepository } from "@/repositories/pets/pets-repository";
import { Pet } from "@prisma/client";

interface ListPetRequest {
  city: string
  age?: string
  energy?: string,
  size?: string 
} 

interface ListPetResponse {
  pets: Pet[]
}

export class ListPetService {

  constructor(private petsRepository: PetsRepository) { }

  async execute({ city, age, energy, size }: ListPetRequest): Promise<ListPetResponse> {
    const pets = await this.petsRepository.listPetsByCity(city, age, energy, size)
    return { pets }
  }
}