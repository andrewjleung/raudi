import { preHandlerHookHandler } from 'fastify';

export const verifyFreesoundLogin: preHandlerHookHandler = (
  request,
  reply,
  done,
) => {
  if (request.freesound === undefined) {
    reply.code(401).send('Unauthorized');
    done();
    return;
  }

  done();
};
