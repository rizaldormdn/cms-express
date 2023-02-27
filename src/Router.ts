import { Router as ExpressRouter } from "express";
import Handler from "./Handler";
import UserRepository from "./user/domain/repository/UserRepository";
import UserHandler from "./user/presentation/http/UserHandler";
import AdministratorService from "./user/application/service/AdministratorService";
import ResetPasswordService from "./user/application/service/ResetPasswordService";
import UserService from "./user/application/service/UserService";
import ArticleHandler from "./article/presentation/http/ArticleHandler";
import ArticleService from "./article/domain/service/ArticleService";
import ImageRepository from "./image/domain/repository/ImageRepository";
import ArticleRepository from "./article/domain/repository/ArticleRepository";
import ImageHandler from "./image/presentation/http/ImageHandler";
import ImageService from "./image/application/service/ImageService";

export default class Router {
  public static run(
    userRepository: UserRepository,
    imageRepository: ImageRepository,
    articleRepository: ArticleRepository,
    userService: UserService,
    imageService: ImageService,
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
    router.use('/v1', ImageHandler.router(
      imageRepository,
      imageService
    ))

    return router
  }
}