import { Router } from 'express';
import PingHandler from './handler/PingHandler';
import UserHandler from './handler/UserHandler';
import ImageHandler from './handler/ImageHandler';
import { Connection } from 'mysql2';
import ArticleHandler from './handler/ArticleHandler';

export default (connection: Connection): Router => {
  const router: Router = Router();

  router.use('/v1', PingHandler())
<<<<<<< HEAD
  router.use('/v2', UserHandler(connection))
  router.use('/v3', ImageHandler(connection))
=======
  router.use('/v1', ArticleHandler(connection))
  router.use('/v1', UserHandler(connection))
>>>>>>> 80447ab0e0bf4f2ec1a243d3c09df595e3e58bb4

  return router;
}