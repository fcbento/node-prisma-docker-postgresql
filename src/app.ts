import fastify from 'fastify'
import { ZodError } from 'zod';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { usersRoutes } from './controllers/users/routes';
import { orgRoutes } from './controllers/orgs/routes';
import { authRoutes } from './controllers/auth/routes';
import { petRoutes } from './controllers/pets/routes';

export const app = fastify()

app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false
  },
  sign: {
    expiresIn: '10m',
  }
})

app.register(usersRoutes)
app.register(orgRoutes)
app.register(authRoutes)
app.register(petRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400).send({
        message: 'Validation error',
        issues: error.format()
      })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    //TODO: We should log to an external tool like DataDog/NewRelix/Sentry/SEQ
  }

  return reply.status(500).send({ message: 'Internal server error' })
})