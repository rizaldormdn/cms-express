import { Router as ExpressRouter } from "express";
import Handler from "./Handler";

export default class Router {
  public static run(): ExpressRouter {
    const router: ExpressRouter = ExpressRouter();

    router.use('/v1', Handler.ping)

    return router
  }
}