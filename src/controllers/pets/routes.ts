import { FastifyInstance } from "fastify";
import { registerPet } from "./register-pet-controller";

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets', registerPet)
}