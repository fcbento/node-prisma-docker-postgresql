import { FastifyInstance } from "fastify";
import { registerOrg } from "./register-org-controller";

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrg)
}