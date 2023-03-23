"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const ts_dotenv_1 = require("ts-dotenv");
const cors_1 = __importDefault(require("@fastify/cors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const env = (0, ts_dotenv_1.load)({
    PORT: Number,
    DATABASE_URL: String,
});
const server = (0, fastify_1.default)({});
const opts = {
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
};
server.register(cors_1.default, {
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
    });
    console.log(user);
    return reply.status(200).send({ user });
});
const start = async () => {
    try {
        await server.listen({ port: env.PORT });
        const address = server.server.address();
        const port = typeof address === 'string' ? address : address?.port;
        console.log('Server inited...');
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
console.log('Server initing...');
start();
