import { Router } from 'express';
import PingHandler from './handler/PingHandler';
import UserHandler from './handler/UserHandler';
import { Connection } from 'mysql2';

export default (connection: Connection): Router => {
  const router: Router = Router();

  router.use('/v1', PingHandler())
  router.use('/v2', UserHandler(connection))

  return router;
}