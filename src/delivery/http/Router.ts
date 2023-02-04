import { Router } from 'express';
import PingHandler from './Handler/PingHandler';
import CategoryHandler from './Handler/CategoryHandler';
import { Connection } from 'mysql2';
import CategoryMySQL from '../../infrastructure/database/mysql/CategoryRepository';
import ErrorHandler from './Handler/ErrorHandler';

export default (connection: Connection): Router => {
  const router: Router = Router();
  let categoryMySQL: CategoryMySQL = new CategoryMySQL(connection);

  router.use('/v1', PingHandler())
  router.use('/v1', CategoryHandler(categoryMySQL))
  router.use('/v1', ErrorHandler())

  return router;
}