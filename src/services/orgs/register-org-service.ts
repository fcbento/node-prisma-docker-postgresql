import { OrgsRepository } from "@/repositories/orgs/orgs-repository"
import { Org } from "@prisma/client"
import bcrypt from 'bcryptjs'
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error"
import { getAddressByCep, AddressResponse } from "../cep/cep-api-service"

interface RegisterOrgRequest {
  name: string
  email: string
  password: string
  cep: string
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
    const address = await getAddressByCep(cep) as AddressResponse
    const org = await this.orgsRepository.create({ 
      name,
      email,
      password_hash,
      cep,
      whatsapp,
      bairro: address.bairro,
      estado: address.estado,
      localidade: address.localidade,
      logradouro: address.logradouro,
      uf: address.uf
    })
    return { org }
  }
}
