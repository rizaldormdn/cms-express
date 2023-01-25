import { Router } from 'express';
import PingHandler from './Handler/PingHandler';
import CategoryHandler from './Handler/CategoryHandler';
import { Connection } from 'mysql';
import CategoryMySQL from '../../infrastructure/database/CategoryMySQL';

export default (connection: Connection): Router => {
  const router: Router = Router();
  let categoryMySQL: CategoryMySQL = new CategoryMySQL(connection);

  router.use('/v1', PingHandler())
  router.use('/v1', CategoryHandler(categoryMySQL))

  return router;
}