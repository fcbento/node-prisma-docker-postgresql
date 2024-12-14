import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { prisma } from "@/lib/prisma";
import { getAddressByCep, AddressResponse } from "@/services/cep/cep-api-service";

describe('Register PET e2e', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register pet', async () => {
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

    const response = await request(app.server)
      .post('/pets')
      .send({
        name: 'Felipe',
        age: 'teste@testeee.com',
        cep: '08560200',
        description: 'Nice cat',
        energy: 'Lots of energy',
        environment: 'All',
        org_id: org.id,
        size: 'Small'
      })

    expect(response.body.pet).toEqual(expect.objectContaining({
      localidade: expect.any(String)
    }))
    expect(response.statusCode).toEqual(201)
  })
})