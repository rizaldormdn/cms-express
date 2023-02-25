import { Router as ExpressRouter } from "express";
import Handler from "./Handler";
import UserRepository from "./domain/repository/UserRepository";
import UserHandler from "./presentation/http/UserHandler";

export default class Router {
  public static run(userRepository: UserRepository): ExpressRouter {
    const router: ExpressRouter = ExpressRouter();
  
    router.use('/', Handler.router())
    router.use('/v1', UserHandler.router(userRepository))

    return router
  }
}