import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

describe('Register e2e', () => {
  
  beforeAll(async() => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'Felipe',
        email: 'teste@testeee.com',
        password: '123456'
      })
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