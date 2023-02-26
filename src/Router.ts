import { Router as ExpressRouter } from "express";
import Handler from "./Handler";
import UserRepository from "./domain/repository/UserRepository";
import UserHandler from "./presentation/http/UserHandler";
import AdministratorService from "./application/service/AdministratorService";
import ResetPasswordService from "./application/service/ResetPasswordService";
import UserService from "./application/service/UserService";
import ArticleHandler from "./presentation/http/ArticleHandler";
import ArticleService from "./domain/service/ArticleService";
import ImageRepository from "./domain/repository/ImageRepository";
import ArticleRepository from "./domain/repository/ArticleRepository";

export default class Router {
  public static run(
    userRepository: UserRepository,
    imageRepository: ImageRepository,
    articleRepository: ArticleRepository,
    userService: UserService,
    articleService: ArticleService,
    administratorService: AdministratorService,
    resetPasswordService: ResetPasswordService
  ): ExpressRouter {
    const router: ExpressRouter = ExpressRouter();
  
    router.use('/', Handler.router())
    router.use('/v1', UserHandler.router(
      userRepository,
      userService,
      administratorService,
      resetPasswordService
    ))
    router.use('/v1', ArticleHandler.router(
      userRepository,
      imageRepository,
      articleRepository,
      articleService
    ))

    return router
  }
}