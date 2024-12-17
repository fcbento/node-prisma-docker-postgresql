import { InMemoryPetRequirementsRepository } from "@/repositories/pet-requirements/in-memory-pet-requirements-repository"
import { describe, expect, it } from "vitest"
import { RegisterPetRequirementsService } from "../pet-requirements-service"

let petsRepository: InMemoryPetRequirementsRepository
let sut: RegisterPetRequirementsService

describe('Register pet photos', () => {

  petsRepository = new InMemoryPetRequirementsRepository()
  sut = new RegisterPetRequirementsService(petsRepository)

  it('should register pet requirement', async () => {
    const petRequirement = await sut.execute({ pet_id: '1', requirement: 'To live inside the house' })
    expect(petRequirement.requirement).toBeDefined()
  })
})