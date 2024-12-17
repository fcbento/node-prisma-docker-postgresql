import { InMemoryPetRequirementsRepository } from "@/repositories/pet-requirements/in-memory-pet-requirements-repository"
import { GetPetRequirementsService } from "../get-pet-requirements-service"
import { describe, expect, it } from "vitest"

let petsRepository: InMemoryPetRequirementsRepository
let sut: GetPetRequirementsService

describe('Get pet photos', () => {

  petsRepository = new InMemoryPetRequirementsRepository()
  sut = new GetPetRequirementsService(petsRepository)

  it('should get pet photos', async () => {

    await petsRepository.create({
      pet_id: '1',
      requirement: 'To live inside the house'
    })

    const response = await sut.execute({ id: '1' })
    
    expect(response.requirements).toHaveLength(1)
  })
})