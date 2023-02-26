require("dotenv").config();

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
import ArticleMapper, { ArticleSnapshotMapper } from "./ArticleMapper";
import Email from "../../domain/valueobject/Email";
import ImageRepository from "../../domain/repository/ImageRepository";
import ArticleRepository from "../../domain/repository/ArticleRepository";
import Specification from "../../application/valueobject/Specification";
import { ArticleSnapshots } from "../../domain/valueobject/ArticleSnapshot";
import Slug from "../../domain/valueobject/Slug";

export default class ArticleHandler {
  public static router(
    userRepository: UserRepository,
    imageRepository: ImageRepository,
    articleRepository: ArticleRepository,
    articleService: ArticleService
  ): Router {
    const router: Router = Router();

    router.get('/featured-articles', async (_: Request, res: Response) => {
      try {
        let featuredArticles: ArticleSnapshots = await articleRepository.getFeaturedArticles()

        res.status(200).json({
          status: Status.Success,
          data: ArticleSnapshotMapper.toJSON(featuredArticles)
        }).end()
      } catch(err) {
        console.error(err)

        res.status(500).json({
          status: Status.Error,
          message: 'failed to get featured articles'
        }).end()
      }
    })

    router.get('/articles', async (req: Request, res: Response) => {
      try {
        let page = Number(req.query.page ?? 1)
        let limit = Number(process.env.LIMIT_ARTICLES)
        let specification: Specification = new Specification(String(req.query.search ?? ''), page)

        if (req.query.author) {
          let authorEmail: Email = new Email(String(req.query.author))
          let articles: ArticleSnapshots = await articleRepository.getArticlesByAuthor(specification, authorEmail)
          let total: number = await articleRepository.countArticlesByAuthor(specification, authorEmail)

          res.status(200).json({
            status: Status.Success,
            data: {
              articles: ArticleSnapshotMapper.toJSON(articles),
              paging: {
                page: page,
                pages: Math.ceil(total / limit),
                limit: limit,
                total: total
              }
            }
          }).end()
        }

        let articles: ArticleSnapshots = await articleRepository.getArticles(specification)
        let total: number = await articleRepository.countArticles(specification)

        res.status(200).json({
          status: Status.Success,
          data: {
            articles: ArticleSnapshotMapper.toJSON(articles),
            paging: {
              page: page,
              pages: Math.ceil(total / limit),
              limit: limit,
              total: total
            }
          }
        }).end()
      } catch(err) {
        console.error(err)

        res.status(500).json({
          status: Status.Error,
          message: 'failed to get articles'
        }).end()
      }
    })

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
        }).end()
      } catch (err) {
        console.error(err)

        res.status(500).json({
          status: Status.Error,
          message: 'failed to create an article'
        }).end()
      }
    })

    router.get('/articles/:slug', async (req: Request, res: Response) => {
      try {
        let slug: Slug = new Slug().rebuild(req.params.slug)
        let article: Article = await articleRepository.getArticle(slug)

        res.status(200).json({
          status: Status.Success,
          data: ArticleMapper.toJSON(article)
        }).end()
      } catch(err) {
        console.error(err)

        res.status(500).json({
          status: Status.Error,
          message: 'failed to get an article'
        }).end()
      }
    })

    router.put('/articles/:slug', Middleware.authentication, async (req: Request, res: Response) => {
      try {
        let slug: Slug = new Slug().rebuild(req.params.slug)
        let email: Email = new Email(res.locals.user.email);
        let user: User = await userRepository.getUser(email)
        let author: Author = new Author(user.email, user.name, user.password, user.resetPasswordToken)
        let newContent: Content = new Content(req.body.title, req.body.content, req.body.excerpt)
        let newImage: Image = await imageRepository.getImage(req.body.image_id)
        let newTags: Tags = []

        for (let tag of req.body.tags) {
          newTags.push(new Tag(tag))
        }

        await articleService.updateArticle(author, slug, newContent, newImage, newTags)

        res.status(200).json({
          status: Status.Success
        }).end()
      } catch(err) {
        console.error(err)

        res.status(500).json({
          status: Status.Error,
          message: 'failed to edit an article'
        }).end()
      }
    })

    router.delete('/articles/:slug', Middleware.authentication, async (req: Request, res: Response) => {
      try {
        let slug: Slug = new Slug().rebuild(req.params.slug)
        let email: Email = new Email(res.locals.user.email);
        let user: User = await userRepository.getUser(email)

        await articleService.deleteArticle(user, slug)

        res.status(200).json({
          status: Status.Success
        }).end()
      } catch(err) {
        console.error(err)

        res.status(500).json({
          status: Status.Error,
          message: 'failed to delete an article'
        }).end()
      }
    })

    router.post('/publish-article/:slug', Middleware.authentication, async (req: Request, res: Response) => {
      try {
        let slug: Slug = new Slug().rebuild(req.params.slug)
        let email: Email = new Email(res.locals.user.email);
        let user: User = await userRepository.getUser(email)
        let author: Author = new Author(user.email, user.name, user.password, user.resetPasswordToken)

        await articleService.publishArticle(author, slug)

        res.status(200).json({
          status: Status.Success
        }).end()
      } catch(err) {
        console.error(err)

        res.status(500).json({
          status: Status.Error,
          message: 'failed to publish an article'
        }).end()
      }
    })

    router.post('/unpublish-article/:slug', Middleware.authentication, async (req: Request, res: Response) => {
      try {
        let slug: Slug = new Slug().rebuild(req.params.slug)
        let email: Email = new Email(res.locals.user.email);
        let user: User = await userRepository.getUser(email)
        let author: Author = new Author(user.email, user.name, user.password, user.resetPasswordToken)

        await articleService.unpublishArticle(author, slug)

        res.status(200).json({
          status: Status.Success
        }).end()
      } catch(err) {
        console.error(err)

        res.status(500).json({
          status: Status.Error,
          message: 'failed to unpublish an article'
        }).end()
      }
    })

    return router
  }
}