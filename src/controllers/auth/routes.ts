import { FastifyInstance } from "fastify";
import { auth } from "./auth-controller";

export async function authRoutes(app: FastifyInstance) {
  app.post('/sessions', auth)
}