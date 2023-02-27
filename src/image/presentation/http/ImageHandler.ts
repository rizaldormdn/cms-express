require("dotenv").config();

import { Router, Request, Response } from "express";
import Middleware from "../../../Middleware";
import Specification from "../../../Specification";
import Status from "../../../Status";
import { Images } from "../../domain/entity/Image";
import ImageRepository from "../../domain/repository/ImageRepository";
import ImageMapper from "./ImageMapper";

export default class ImageHandler {
  public static router(
    imageRepository: ImageRepository
  ): Router {
    const router: Router = Router();

    router.get('/images', Middleware.authentication, async (req: Request, res: Response) => {
      try {
        let page = Number(req.query.page ?? 1)
        let limit = Number(process.env.LIMIT_ARTICLES)
        let specification: Specification = new Specification(String(req.query.search ?? ''), page)

        let images: Images = await imageRepository.getImages(specification)
        let total: number = await imageRepository.countImages(specification)

        res.status(200).json({
          status: Status.Success,
          data: {
            images: ImageMapper.toJSON(images),
            paging: {
              page: page,
              pages: Math.ceil(total / limit),
              limit: limit,
              total: total
            }
          }
        }).end()
      } catch (err) {
        console.error(err)

        res.status(500).json({
          status: Status.Error,
          message: 'failed to get images'
        }).end()
      }
    })

    return router
  }
}