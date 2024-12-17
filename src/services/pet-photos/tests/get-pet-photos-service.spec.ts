import { InMemoryPetPhotosRepository } from "@/repositories/photos/in-memory-pet-photos-repository"
import { describe, expect, it } from "vitest"
import { GetPetPhotosService } from "../get-pet-photos-service"

let petsRepository: InMemoryPetPhotosRepository
let sut: GetPetPhotosService

describe('Get pet photos', () => {

  petsRepository = new InMemoryPetPhotosRepository()
  sut = new GetPetPhotosService(petsRepository)

  it('should get pet photos', async () => {

    await petsRepository.create({
      pet_id: '1',
      photo: 'somephoto.png',
    })

    const response = await sut.execute({ id: '1' })
    
    expect(response.photos).toHaveLength(1)
  })
})