import { Router as ExpressRouter } from "express";
import Handler from "./Handler";
import UserRepository from "./domain/repository/UserRepository";
import UserHandler from "./presentation/http/UserHandler";
import AdministratorService from "./application/service/AdministratorService";

export default class Router {
  public static run(userRepository: UserRepository, administratorService: AdministratorService): ExpressRouter {
    const router: ExpressRouter = ExpressRouter();
  
    router.use('/', Handler.router())
    router.use('/v1', UserHandler.router(userRepository, administratorService))

    return router
  }
}