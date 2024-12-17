import { PetsRepository } from '@/repositories/pets/prisma-pets-repository'
import { Pet } from '@prisma/client'
import { AddressResponse, getAddressByCep } from '../cep/cep-api-service'
import { RegisterPetPhotosFacotry } from '../pet-photos/factories/register-pet-photos-factory';
import { RegisterPetRequirementsFacotry } from '../pet-requirements/factories/register-pet-requirements-factory';

interface RegisterPetRequest {
  name: string
  cep: string
  age: string
  description: string
  energy: string
  environment: string
  org_id: string
  size: string
  photos: string[],
  requirements: string[]
}

interface RegisterPetResponse {
  pet: Pet
}

export class RegisterPetService {

  public registerPetPhotosService = RegisterPetPhotosFacotry()
  public registerPetRequirementsService = RegisterPetRequirementsFacotry()

  constructor(
    private petsRepository: PetsRepository
  ) { }

  async execute({ name, cep, age, description, energy, environment, org_id, size, photos, requirements }: RegisterPetRequest): Promise<RegisterPetResponse> {
    const address = await getAddressByCep(cep) as AddressResponse
    const pet = await this.petsRepository.create({
      name,
      cep,
      age,
      description,
      energy,
      environment,
      org_id,
      size,
      bairro: address.bairro,
      estado: address.estado,
      localidade: address.localidade,
      logradouro: address.logradouro,
      uf: address.uf
    })

    if(photos.length) {
      for await (const photo of photos) {
        await this.registerPetPhotosService.execute({ pet_id: pet.id, photo })
      }
    }

    if(requirements.length) {
      for await (const requirement of requirements) {
        await this.registerPetRequirementsService.execute({ pet_id: pet.id, requirement })
      }
    }
    return { pet }
  }
}
