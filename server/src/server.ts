import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { load } from 'ts-dotenv';
import cors from '@fastify/cors';

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

const start = async () => {
  try {
    await server.listen({ port: env.PORT });

    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;

  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
start();