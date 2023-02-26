import { Router, Request, Response } from "express";
import Article from "../../domain/aggregate/Article";
import Author from "../../domain/entity/Author";
import Image from "../../domain/entity/Image";
import User from "../../domain/entity/User";
import ArticleService from "../../domain/service/ArticleService";
import Content from "../../domain/valueobject/Content";
import Tag, { Tags } from "../../domain/valueobject/Tag";
import UserRepository from "../../domain/repository/UserRepository";
import Middleware from "../../Middleware";
import Status from "../../Status";
import ArticleMapper from "./ArticleMapper";
import Email from "../../domain/valueobject/Email";
import ImageRepository from "../../domain/repository/ImageRepository";

export default class ArticleHandler {
  public static router(
    userRepository: UserRepository,
    imageRepository: ImageRepository,
    articleService: ArticleService
  ): Router {
    const router: Router = Router();

    router.post('/articles', Middleware.authentication, async (req: Request, res: Response) => {
      if (res.locals.user.is_administrator) {
        res.status(403).json({
          status: Status.Error
        }).end();
      }

      try {
        let email: Email = new Email(res.locals.user.email);
        let user: User = await userRepository.getUser(email)
        let author: Author = new Author(user.email, user.name, user.password, user.resetPasswordToken)
        let content: Content = new Content(req.body.title, req.body.content, req.body.excerpt)
        let image: Image = await imageRepository.getImage(req.body.image_id)
        let tags: Tags = []

        for (let tag of req.body.tags) {
          tags.push(new Tag(tag))
        }

        let article: Article = await articleService.addArticle(author, content, image, tags)

        res.status(200).json({
          status: Status.Success,
          data: ArticleMapper.toJSON(article)
        })
      } catch (err) {
        console.error(err)

        res.status(500).json({
          status: Status.Error,
          message: 'failed to create an article'
        }).end()
      }
    })

    return router
  }
}