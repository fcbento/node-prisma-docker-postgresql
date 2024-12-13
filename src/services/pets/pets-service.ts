import { PetsRepository } from '@/repositories/pets/prisma-pets-repository'
import { Pet } from '@prisma/client'

interface RegisterPetRequest {
  name: string
  cep: string
  age: string
  description: string
  energy: string
  environment: string
  org_id: string
  size: string
}

interface RegisterPetResponse {
  pet: Pet
}

export class RegisterPetService {

  constructor(private petsRepository: PetsRepository) { }

  async execute({ name, cep, age, description, energy, environment, org_id, size }: RegisterPetRequest): Promise<RegisterPetResponse> {
    const pet = await this.petsRepository.create({ name, cep, age, description, energy, environment, org_id, size })
    return { pet }
  }
}
