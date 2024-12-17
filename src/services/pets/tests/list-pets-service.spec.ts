import { InMemoryPetsRepository } from "@/repositories/pets/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ListPetService } from "../list-pets-service";
import { RegisterPetService } from "../pets-service";

let petsRepository: InMemoryPetsRepository
let sut: ListPetService
let sutRegister: RegisterPetService

describe('List pets service', () => {

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new ListPetService(petsRepository)
    sutRegister = new RegisterPetService(petsRepository)
  })

  it('should list pets by city', async () => {

    await sutRegister.execute({
      age: 'Small',
      cep: '13423790',
      description: 'A really nice cat',
      energy: 'Active',
      environment: 'All',
      name: 'Harry',
      org_id: '1',
      size: 'Big',
      photos: [],
      requirements: []
    })

    await sutRegister.execute({
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

    const response = await sut.execute({ city: 'Piracicaba' })
    expect(response.pets).toHaveLength(1)
  })

})