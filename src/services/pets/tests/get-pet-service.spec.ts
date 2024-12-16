import { beforeEach, describe, expect, it } from "vitest";
import { GetPetService } from "../get-pet-service";
import { PetsRepository } from "@/repositories/pets/prisma-pets-repository";
import { InMemoryPetsRepository } from "@/repositories/pets/in-memory-pets-repository";
import { AddressResponse, getAddressByCep } from "@/services/cep/cep-api-service";

let sut: GetPetService
let petsRepository: PetsRepository

describe('Get pet by id', () => {

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetService(petsRepository)
  })

  it('should get pet by id', async () => {
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

    const { pet } = await sut.execute({ id: createdPet.id })
    expect(pet?.age).toEqual(createdPet.age)
  })

  it('should not get pet by id', async () => {
    const address = await getAddressByCep('08560200') as AddressResponse

    await petsRepository.create({
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

    const { pet } = await sut.execute({ id: 'NON_EXISTING ID' })
    expect(pet?.age).toBeUndefined()
  })
})