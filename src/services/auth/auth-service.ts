import bcrypt from 'bcryptjs'
import { Org, User } from "@prisma/client";
import { UsersRepository } from '@/repositories/users/users-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { OrgsRepository } from '../../repositories/orgs/orgs-repository';
import { AuthType } from '@/enums/auth-type.enum';

interface AuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  entity: User | Org
}

export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private orgsRepository: OrgsRepository
  ) { }

  async execute({ email, password }: AuthRequest, authType: AuthType): Promise<AuthResponse> {

    const repository = authType === AuthType.ORG ? this.orgsRepository : this.usersRepository
    const entity = await repository.findByEmail(email)

    if (!entity) throw new InvalidCredentialsError()
    const doesPasswordMatches = await bcrypt.compare(password, entity.password_hash)

    if (!doesPasswordMatches) throw new InvalidCredentialsError()
    return { entity }
  }
}