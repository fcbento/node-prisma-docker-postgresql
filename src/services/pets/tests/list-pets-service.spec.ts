import { beforeEach, describe, expect, it } from "vitest";
import { PetsRepository } from "@/repositories/pets/prisma-pets-repository";
import { InMemoryPetsRepository } from "@/repositories/pets/in-memory-pets-repository";
import { AddressResponse, getAddressByCep } from "@/services/cep/cep-api-service";
import { ListPetService } from "../list-pets-service";

let sut: ListPetService
let petsRepository: PetsRepository

describe('List pets by city', () => {

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new ListPetService(petsRepository)
  })

  it('should get pets by city', async () => {
    const address = await getAddressByCep('08560200') as AddressResponse

    const createdPet = await petsRepository.create({
      age: 'Small',
      cep: '08560250',
      description: 'A really nice cat',
      energy: 'Active',
      environment: 'All',
      name: 'Harry',
      org_id: '1',
      size: 'Big',
      bairro: address.bairro,
      estado: address.estado,
      localidade: address.localidade,
      logradouro: address.logradouro,
      uf: address.uf,
    })

    const { pets } = await sut.execute({ city: createdPet.localidade })
    expect(pets).toHaveLength(1)
  })
})