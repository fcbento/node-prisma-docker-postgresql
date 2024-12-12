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

describe('Register org e2e', () => {
  
  beforeAll(async() => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register org', async () => {
    const response = await request(app.server)
      .post('/orgs')
      .send(orgRequest)
    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to register when any required property is missing', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'Felipe',
      })
    expect(response.statusCode).toEqual(400)
  })
})