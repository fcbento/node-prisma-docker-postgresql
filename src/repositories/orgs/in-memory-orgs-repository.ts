import { User, Prisma, Org, Role } from "@prisma/client";
import { OrgsRepository } from "./orgs-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgsRepository implements OrgsRepository {

  public orgs: Org[] = []

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find(user => user.email === email)
    if(!org) return null
    return org
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.orgs.find(org => org.id === id)
    return org || null
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org: Org = {
      id: randomUUID(),
      name: data.name,
      cep: data.cep as bigint,
      email: data.email,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      created_at: new Date(),
      role: data.role as Role
    }

    this.orgs.push(org)
    
    return org
  }

}