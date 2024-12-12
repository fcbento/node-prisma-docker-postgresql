import { expect, describe, it, beforeEach } from 'vitest'
import bcrypt from 'bcryptjs';
import { InMemoryOrgsRepository } from '@/repositories/orgs/in-memory-orgs-repository';
import { RegisterOrgService } from '../register-org-service';
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error';

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgService

const request = {
  name: 'Test Org',
  cep: 8560250,
  email: 'org@test.com',
  password: '123456',
  whatsapp: '985672298'
}

describe('Register user service', () => {

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgService(orgsRepository)
  })

  it('should create org', async () => {
    const { org } = await sut.execute(request)
    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute(request)
    const isPasswordCorrectlyHashed = await bcrypt.compare('123456', org.password_hash)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register an org', async () => {
    const { org } = await sut.execute({...request, password: '654321'})
    const isPasswordCorrectlyHashed = await bcrypt.compare('123456', org.password_hash)
    expect(isPasswordCorrectlyHashed).toBe(false)
  })

  it('should not be able to register with same email', async () => {
    const email = 'test@email.com'
    await sut.execute({...request, email})
    await expect(() =>
      sut.execute({...request, email}),
    )?.rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})