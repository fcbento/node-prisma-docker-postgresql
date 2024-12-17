import { InMemoryPetsRepository } from "@/repositories/pets/in-memory-pets-repository"
import { describe, beforeEach, it, expect } from "vitest"
import { RegisterPetService } from "../pets-service"
import { PetsRepository } from "@/repositories/pets/prisma-pets-repository"

let petsRepository: PetsRepository
let sut: RegisterPetService

describe.skip('Register pet service', () => {

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetService(petsRepository)
  })

  it.skip('should create pet', async () => {
    
    const { pet } = await sut.execute({
      age: 'Small',
      cep: '08560250',
      description: 'A really nice cat',
      energy: 'Active',
      environment: 'All',
      name: 'Harry',
      org_id: '1',
      size: 'Big',
      photos: [],
      requirements: []
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})