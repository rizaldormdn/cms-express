import { Router } from 'express';
import PingHandler from './handler/PingHandler';

export default (): Router => {
  const router: Router = Router();

  router.use('/v1', PingHandler())

  return router;
}