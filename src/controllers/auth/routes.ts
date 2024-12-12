import { FastifyInstance } from "fastify";
import { auth } from "./auth-controller";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/authenticate', auth)
}