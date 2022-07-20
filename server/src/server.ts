import crypto from 'crypto';
import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { AuthCode } from './schemas/auth.js';
import 'dotenv/config';

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const encrypt = (text: crypto.BinaryLike): string => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return encrypted.toString('hex');
};

const decrypt = (encryptedData: string): string => {
  const encryptedText = Buffer.from(encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);
  return decrypted.toString();
};

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

fastify.register(fastifyJwt, {
  secret: crypto.randomBytes(256).toString('base64'),
});

fastify.get(
  '/token',
  {
    schema: {
      querystring: AuthCode,
    },
  },
  async (request, reply) => {
    const { code } = request.query;

    // Encrypt the code.

    reply.send(code);
  },
);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
