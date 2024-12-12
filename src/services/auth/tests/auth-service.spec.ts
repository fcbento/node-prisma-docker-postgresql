import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from '@/repositories/users/in-memory-users-repository';
import { AuthService } from '../auth-service';
import { AuthType } from "@/enums/auth-type.enum";
import { InMemoryOrgsRepository } from "@/repositories/orgs/in-memory-orgs-repository";
import { RegisterUserService } from "@/services/users/register-user-service";

describe('Auth service', () => {

  let usersRepository: InMemoryUsersRepository
  let orgsRepository: InMemoryOrgsRepository
  let sut: AuthService
  let userService: RegisterUserService
  let orgService: RegisterUserService

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    orgsRepository = new InMemoryOrgsRepository()
    userService = new RegisterUserService(usersRepository)
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
})