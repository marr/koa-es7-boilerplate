import Koa from 'koa';
import Router from 'koa-router';
import convert from 'koa-convert';
import session from 'koa-generic-session';
import cors from 'kcors';
import responseCalls from '../middleware/responseCalls';
import createApis from './createApis';
import createAuth from './createAuth';
import getConfiguredContainer from './configureContainer';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';

/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Koa} The configured app.
 */
export default async function createServer() {
  const app = new Koa();
  const router = new Router();

  app.use(responseCalls);
  app.use(cors());
  app.use(convert(session()));
  app.keys = ['your-secret'];

  app.use(bodyParser());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(router.allowedMethods());
  app.use(router.routes());

  // Container is configured with our services and whatnot.
  const container = await getConfiguredContainer();
  await createApis(router, container);
  await createAuth(router, container);

  // Default handler when nothing stopped the chain.
  app.use(async (ctx) => {
    ctx.notFound('Whatever you were looking for, we ain\'t got it, son.');
  });

  return app;
}
