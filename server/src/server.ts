import fastify from 'fastify'

const server = fastify()

server.get('/ping', async (request, reply) => {
  return reply.status(200).send({ msg: 'ok' });
})

const PORT: any = process.env.PORT || 9001;

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

/*
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { load } from 'ts-dotenv';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const env = load({
  PORT: Number,
  DATABASE_URL: String,
});

const server: FastifyInstance = Fastify({});

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          msg: {
            type: 'string'
          }
        }
      }
    }
  }
}

server.register(cors, {
  // put your options here
});

server.get('/', opts, async (request, reply) => {
  return { msg: 'it worked!' };
});

server.post('/user', async (resquest, reply) => {
  const user = await prisma.user.create({
    data: {
      name: 'Fulano de Tal',
      email: 'fulano@email.com',
    },
  })
  console.log(user)
  return reply.status(200).send({ user });
});

const start = async () => {
  try {
    await server.listen({ port: env.PORT || 9001 });

    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;
    console.log(port);
    console.log('Server inited...');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

console.log(env.PORT);
console.log('Server initing...');
start();
*/