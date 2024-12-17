import { InMemoryPetsRepository } from "@/repositories/pets/in-memory-pets-repository"
import { describe, beforeEach, it, expect } from "vitest"
import { RegisterPetService } from "../pets-service"

let petsRepository: InMemoryPetsRepository
let sut: RegisterPetService

describe('Register pet service', () => {

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetService(petsRepository)
  })

  it('should create pet', async () => {
    
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