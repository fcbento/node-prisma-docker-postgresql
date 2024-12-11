import { RegisterUserService } from "../register-user-service"
import { PrismaUsersRepository } from '@/repositories/users/prisma-users-repository';

export function RegisterUserFacotry(){
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUserService(usersRepository)

  return registerUseCase
}