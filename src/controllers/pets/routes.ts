import { FastifyInstance } from "fastify";
import { registerPet } from "./register-pet-controller";
import { listPet } from "./list-pet-controller";
import { getPetById } from "./get-pet-controller";

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets', registerPet)
  app.get('/pets/:city', listPet)
  app.get('/pets/single/:id', getPetById)
}