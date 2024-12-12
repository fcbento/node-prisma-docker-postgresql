import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/users/in-memory-users-repository'
import bcrypt from 'bcryptjs';
import { RegisterUserService } from '../register-user-service';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserService

const userRequest = {
  name: 'Test',
  email: 'testing@test.com',
  password: '123456'
}

describe('Register user service', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserService(usersRepository)
  })

  it('should create user', async () => {
    const { user } = await sut.execute(userRequest)
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password uopn registration', async () => {
    const { user } = await sut.execute(userRequest)
    const isPasswordCorrectlyHashed = await bcrypt.compare('123456', user.password_hash)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register user', async () => {
    const { user } = await sut.execute({...userRequest, password: '654321'})
    const isPasswordCorrectlyHashed = await bcrypt.compare('123456', user.password_hash)
    expect(isPasswordCorrectlyHashed).toBe(false)
  })

  it('should not be able to register with same email', async () => {
    const email = 'test@email.com'
    await sut.execute({ ...userRequest, email })

    await expect(() =>
      sut.execute({ ...userRequest, email }),
    )?.rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})