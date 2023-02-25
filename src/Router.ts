import { Router as ExpressRouter } from "express";
import Handler from "./Handler";
import UserRepository from "./domain/repository/UserRepository";
import UserHandler from "./presentation/http/UserHandler";
import AdministratorService from "./application/service/AdministratorService";
import ResetPasswordService from "./application/service/ResetPasswordService";

export default class Router {
  public static run(
    userRepository: UserRepository,
    administratorService: AdministratorService,
    resetPasswordService: ResetPasswordService
  ): ExpressRouter {
    const router: ExpressRouter = ExpressRouter();
  
    router.use('/', Handler.router())
    router.use('/v1', UserHandler.router(userRepository, administratorService, resetPasswordService))

    return router
  }
}