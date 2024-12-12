import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from '@/repositories/users/in-memory-users-repository';
import { AuthService } from '../auth-service';
import { AuthType } from "@/enums/auth-type.enum";
import { InMemoryOrgsRepository } from "@/repositories/orgs/in-memory-orgs-repository";
import { RegisterUserService } from "@/services/users/register-user-service";
import { RegisterOrgService } from "@/services/orgs/register-org-service";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

const orgRequest = {
  name: 'Test Org',
  cep: 8560250,
  email: 'org@test.com',
  password: '123456',
  whatsapp: '985672298'
}

describe('Auth service', () => {

  let usersRepository: InMemoryUsersRepository
  let orgsRepository: InMemoryOrgsRepository
  let sut: AuthService
  let userService: RegisterUserService
  let orgService: RegisterOrgService

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    orgsRepository = new InMemoryOrgsRepository()
    userService = new RegisterUserService(usersRepository)
    orgService = new RegisterOrgService(orgsRepository)
    sut = new AuthService(usersRepository, orgsRepository)
  })

  it('should be able to authenticate as user', async () => {

    const { user } = await userService.execute({
      name: 'Test',
      email: 'testing@test.com',
      password: '123456'
    })

    const { entity } = await sut.execute({
      email: user.email,
      password: '123456'
    }, AuthType.USER)

    expect(entity.email).toEqual(user.email)
  })

  it('should be able to authenticate as user', async () => {
    const { org } = await orgService.execute(orgRequest)
    const { entity } = await sut.execute({
      email: org.email,
      password: '123456'
    }, AuthType.ORG)

    expect(entity.email).toEqual(org.email)
  })

  it('should not be able to authenticate as user', async () => {

    await userService.execute({
      name: 'Test',
      email: 'testing@test.com',
      password: '1234561'
    })

    await expect(() =>
      sut.execute({
        email: 'non-existing@test.com',
        password: 'NON_EXISTING_PASSWORD'
      }, AuthType.USER)
    )?.rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate as org', async () => {

    await orgService.execute(orgRequest)

    await expect(() =>
      sut.execute({
        email: 'non-existing@test.com',
        password: 'NON_EXISTING_PASSWORD'
      }, AuthType.ORG)
    )?.rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})