import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { AddressResponse, getAddressByCep } from "@/services/cep/cep-api-service";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

describe('Get pet by id', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get pet by id', async () => {
    const address = await getAddressByCep('08560200') as AddressResponse

    const org = await prisma.org.create({
      data: {
        cep: '08560200',
        email: 'teste@teste.com',
        name: 'OEG TEST',
        password_hash: '123456',
        whatsapp: '119827464',
        bairro: address.bairro,
        estado: address.estado,
        localidade: address.localidade,
        logradouro: address.logradouro,
        uf: address.uf
      }
    })

    const petAddress = await getAddressByCep('13423790') as AddressResponse

    const pet = await prisma.pet.create({
      data: {
        age: 'Small',
        cep: '13423790',
        description: 'A really nice cat',
        energy: 'Active',
        environment: 'All',
        name: 'Harry',
        org_id: org.id,
        size: 'Big',
        localidade: petAddress.localidade,
        bairro: petAddress.bairro,
        estado: petAddress.estado,
        logradouro: petAddress.logradouro,
        uf: petAddress.uf
      }
    })

    const response = await request(app.server).get(`/pets/single/${pet.id}`)
    expect(response.body.pet).toEqual(expect.objectContaining({
      localidade: expect.any(String)
    }))
    expect(response.body.pet.localidade).toEqual(petAddress.localidade)
    expect(response.statusCode).toEqual(200)
  })
})