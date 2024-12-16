import { InMemoryPetPhotosRepository } from "@/repositories/photos/in-memory-pet-photos-repository"
import { describe, expect, it } from "vitest"
import { RegisterPetPhotoService } from "../register-pet-photos-service"

let petsRepository: InMemoryPetPhotosRepository
let sut: RegisterPetPhotoService

describe('Register pet photos', () => {

  petsRepository = new InMemoryPetPhotosRepository()
  sut = new RegisterPetPhotoService(petsRepository)

  it('should register pet photo', async () => {
    const petPhoto = await sut.execute({ pet_id: '1', photo: 'somephoto.png' })
    expect(petPhoto.photo).toBeDefined()
  })
})