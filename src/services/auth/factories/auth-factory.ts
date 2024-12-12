import { PrismaUsersRepository } from '@/repositories/users/prisma-users-repository';
import { AuthService } from '../auth-service';
import { PrismaOrgsRepository } from '@/repositories/orgs/prisma-orgs-repository';
import { AuthType } from '@/enums/auth-type.enum';

export function AuthFacotry() {

  const usersRepository = new PrismaUsersRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const authService = new AuthService(usersRepository, orgsRepository)

  return authService
}