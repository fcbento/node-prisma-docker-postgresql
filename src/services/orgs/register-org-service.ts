import { OrgsRepository } from "@/repositories/orgs/orgs-repository"
import { UsersRepository } from "@/repositories/users/users-repository"
import { Org } from "@prisma/client"
import bcrypt from 'bcryptjs'
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error"

interface RegisterOrgRequest {
  name: string
  email: string
  password: string
  cep: number
  whatsapp: string
}

interface RegisterOrgResponse {
  org: Org
}

export class RegisterOrgService {

  constructor(private orgsRepository: OrgsRepository) { }

  async execute({ name, email, password, cep, whatsapp }: RegisterOrgRequest): Promise<RegisterOrgResponse> {
    const password_hash = await bcrypt.hash(password, 6)
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({ name, email, password_hash, cep, whatsapp })
    return { org }
  }
}
