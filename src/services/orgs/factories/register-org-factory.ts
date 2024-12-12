import { PrismaOrgsRepository } from "@/repositories/orgs/prisma-orgs-repository";
import { RegisterOrgService } from "../register-org-service";

export function RegisterOrgFacotry(){
  const orgsRepository = new PrismaOrgsRepository()
  const registerOrgService = new RegisterOrgService(orgsRepository)

  return registerOrgService
}