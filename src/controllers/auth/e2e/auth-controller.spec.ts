import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

const orgRequest = {
  name: 'Test Org',
  cep: 8560250,
  email: 'org@test.com',
  password: '123456',
  whatsapp: '985672298'
}

describe('Auth e2e', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should not be able to authenticate', async () => {
    
    await request(app.server)
      .post('/orgs')
      .send(orgRequest)

    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'org@test.com',
        password: '123456'
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
  it('should not be able to authenticate', async () => {
    
    await request(app.server)
      .post('/orgs')
      .send(orgRequest)

    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'UNEXISTING@EMAIL.COM',
        password: 'UNEXISTING_PASSWORD'
      })

    expect(response.statusCode).toEqual(400)
  })
})