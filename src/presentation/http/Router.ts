import { Router } from 'express';
import PingHandler from './handler/PingHandler';
import UserHandler from './handler/UserHandler';
import ImageHandler from './handler/ImageHandler';
import { Connection } from 'mysql2';
import ArticleHandler from './handler/ArticleHandler';

export default (connection: Connection): Router => {
  const router: Router = Router();

  router.use('/v1', PingHandler())
  router.use('/v1', ArticleHandler(connection))
  router.use('/v1', UserHandler(connection))

  return router;
}